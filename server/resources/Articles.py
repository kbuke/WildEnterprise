# resources/Articles.py
from flask import request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import db

from models.ArticleModel import ArticleModel
from models.ParkModels import ParkModel
from models.EventModels.EventModel import EventModel

from relational_functions.many_to_many import set_many_to_many
from decorators.require_admin_login import require_admin_login
from schemas.articles import ArticleSchema, DetailedArticleSchema

TEXT_FIELDS = {"title": "title", "img": "img", "text": "text"}


def apply_article_data(article, data):
    """Copies the allowed fields onto the article. Raises ValueError for bad input."""
    for key, attr in TEXT_FIELDS.items():
        if key in data:
            setattr(article, attr, data[key])

    set_many_to_many(article, "parks", ParkModel, data.get("parkIds"))
    set_many_to_many(article, "events", EventModel, data.get("eventIds"))

    status = data.get("status")
    if status == "Published":
        article.publish()
    elif status == "Draft":
        article.unpublish()
    elif status is not None:
        raise ValueError("status must be 'Draft' or 'Published'")



def save(article, data, is_new):
    try:
        with db.session.no_autoflush:
            apply_article_data(article, data)   # validators may query; nothing gets flushed mid-way
        if is_new:
            db.session.add(article)
        db.session.commit()
    except ValueError as e:
        db.session.rollback()
        return {"error": str(e)}, 400
    except IntegrityError:
        db.session.rollback()
        return {"error": "An article with that title already exists"}, 409
    return DetailedArticleSchema().dump(article), 201 if is_new else 200

# ----------------------------- public -----------------------------
class AllArticles(Resource):
    def get(self):
        articles = (ArticleModel.query
                    .filter_by(status="Published")
                    .order_by(ArticleModel.published_at.desc())
                    .all())
        return ArticleSchema(many=True).dump(articles), 200


class SpecificArticle(Resource):
    def get(self, id):
        article = ArticleModel.query.filter_by(id=id, status="Published").first()
        if not article:
            return {"error": "Article not found"}, 404
        return DetailedArticleSchema().dump(article), 200


# ------------------------------ admin -------------------------------
class AdminArticles(Resource):
    @require_admin_login
    def get(self):
        articles = ArticleModel.query.order_by(ArticleModel.id.desc()).all()
        return ArticleSchema(many=True).dump(articles), 200

    @require_admin_login
    def post(self):
        data = request.get_json() or {}
        if not data.get("title"):
            return {"error": "A title is required, even for a draft"}, 400
        return save(ArticleModel(), data, is_new=True)


class AdminSpecificArticle(Resource):
    @require_admin_login
    def get(self, id):
        article = ArticleModel.query.get(id)
        if not article:
            return {"error": "Article not found"}, 404
        return DetailedArticleSchema().dump(article), 200

    @require_admin_login
    def patch(self, id):
        article = ArticleModel.query.get(id)
        if not article:
            return {"error": "Article not found"}, 404
        return save(article, request.get_json() or {}, is_new=False)

    @require_admin_login
    def delete(self, id):
        article = ArticleModel.query.get(id)
        if not article:
            return {"error": "Article not found"}, 404
        db.session.delete(article)   # removes only the link rows, never the parks or events
        db.session.commit()
        return {}, 204