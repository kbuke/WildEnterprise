from datetime import datetime, timezone

from sqlalchemy.orm import validates

from config import db

from functions.check_valid_value import check_valid_value
from functions.check_validate_slug import validate_slug, make_slug_default
from functions.check_string import check_string
from functions.check_unique import check_unique
from functions.check_not_bool_or_none import check_not_bool_or_none

from relational_functions.many_to_many import many_to_many_relationship


class ArticleModel(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    slug = db.Column(db.String, nullable=False, unique=True, default=make_slug_default("title"))
    img = db.Column(db.String, nullable=True)     # may be empty while a draft
    text = db.Column(db.String, nullable=True)    # may be empty while a draft
    status = db.Column(db.String, nullable=False, default="Draft")
    published_at = db.Column(db.DateTime(timezone=True), nullable=True)

    # =========================================================================
    # RELATIONS (all optional: an article with no links just has empty lists)
    # =========================================================================
    parks = many_to_many_relationship("ParkModel", "article_parks", "articles")
    events = many_to_many_relationship("EventModel", "article_events", "articles")
    projects = many_to_many_relationship("ProjectModel", "article_projects", "articles")

    # =========================================================================
    # VALIDATIONS
    # =========================================================================
    @validates("title")
    def validate_article_title(self, key, value):
        check_not_bool_or_none(value)
        check_string(value)
        # If check_unique doesn't ignore the row being edited, re-saving an
        # article with its own title will fail. Test that.
        return check_unique(ArticleModel, key, value.strip())

    @validates("slug")
    def validate_article_slug(self, key, value):
        return validate_slug(value)

    @validates("status")
    def validate_status(self, key, value):
        return check_valid_value(["Draft", "Published"], value)

    @validates("img", "text")
    def validate_optional_strings(self, key, value):
        if value is None:
            return value
        check_string(value)
        return value.strip()

    # =========================================================================
    # PUBLISHING
    # =========================================================================
    def publish(self):
        missing = [f for f in ("title", "img", "text") if not (getattr(self, f) or "").strip()]
        if missing:
            raise ValueError(f"Can't publish: {', '.join(missing)} must be filled in")
        self.status = "Published"
        if self.published_at is None:    # keeps the original date if re-published
            self.published_at = datetime.now(timezone.utc)

    def unpublish(self):
        self.status = "Draft"
