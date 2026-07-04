from sqlalchemy import event
from sqlalchemy.orm import validates
from sqlalchemy.orm.attributes import get_history
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from validators.validate_options import validate_options
from validators.validate_slug import validate_slug

from helpers.many_to_many import many_to_many

from config import db


class BlogModel(db.Model, SerializerMixin):
    __tablename__ = "blogs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    slug = db.Column(db.String, nullable=False)
    cover_photo = db.Column(db.String, nullable=False)
    views = db.Column(db.Integer, default=0)
    content = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False, default="Draft")

    # None until something actually sets them — see event listener below
    updated_at = db.Column(db.DateTime, nullable=True)
    published_at = db.Column(db.DateTime, nullable=True)
    edited_at = db.Column(db.DateTime, nullable=True)

    # Link up blogs with sites
    sites = many_to_many("SiteModel", "blogs", "site_blogs")

    status_options = ["Draft", "Published"]

    @validates("status")
    def validate_status(self, key, value):
        return validate_options(value, self.status_options)

    @validates("title")
    def validate_title_slug(self, key, value):
        self.slug = validate_slug(value)
        return value


@event.listens_for(BlogModel, "before_insert")
def _stamp_blog_timestamps_on_create(mapper, connection, target):
    """
    Runs once, when the row is first created (e.g. via post_instance,
    or seeding). Handles posts created directly as Published or Draft.
    """
    now = datetime.utcnow()

    if target.status == "Published" and target.published_at is None:
        target.published_at = now

    if target.status == "Draft":
        target.updated_at = now


@event.listens_for(BlogModel, "before_update")
def _stamp_blog_timestamps_on_update(mapper, connection, target):
    """
    Runs before any UPDATE to a BlogModel row (i.e. on patch_instance's
    db.session.commit()). Ignores updates where the only change is `views`,
    since that's just a page-view increment, not an edit.
    """
    changed_columns = {
        attr.key
        for attr in mapper.column_attrs
        if get_history(target, attr.key).has_changes()
    }

    meaningful_changes = changed_columns - {"views", "updated_at", "edited_at", "published_at"}

    if not meaningful_changes:
        return  # just a view-count bump — don't touch timestamps

    now = datetime.utcnow()

    # edited_at: bump on every real patch, regardless of status
    target.edited_at = now

    # published_at: only the first time status flips to "Published"
    status_history = get_history(target, "status")
    previous_status = status_history.deleted[0] if status_history.deleted else target.status
    if target.status == "Published" and previous_status != "Published" and target.published_at is None:
        target.published_at = now

    # updated_at: only refresh while the post is (still) a Draft
    if target.status == "Draft":
        target.updated_at = now