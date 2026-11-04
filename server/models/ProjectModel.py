from sqlalchemy.orm import validates

from config import db
from models.DraftableCardModel import DraftableCardModel

from functions.check_validate_slug import make_slug_default, validate_slug
from functions.check_string import check_string
from functions.check_unique import check_unique
from relational_functions.many_to_many import many_to_many_relationship


class ProjectModel(DraftableCardModel):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String, nullable=False, unique=True, default=make_slug_default("name"))

    articles = many_to_many_relationship("ArticleModel", "article_projects", "projects")

    @validates("name", "img", "info")
    def validate_project_text(self, key, value):
        if value is None:
            return None
        check_string(value)
        return check_unique(ProjectModel, key, value.strip())

    @validates("slug")
    def validate_project_slug(self, key, value):
        return validate_slug(value)


