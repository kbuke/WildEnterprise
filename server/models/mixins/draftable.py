from datetime import datetime, timezone

from sqlalchemy.orm import validates

from config import db

DRAFT = "Draft"
PUBLISHED = "Published"


def is_blank(value):
    # None or empty text counts as blank. False and 0 do not (accomodation=False is a real answer)
    return value is None or (isinstance(value, str) and not value.strip())


class DraftableMixin:
    status = db.Column(db.String, nullable=False, default=DRAFT)
    published_at = db.Column(db.DateTime(timezone=True), nullable=True)

    # Attribute names that must be filled in before this can be published
    required_to_publish = ()

    @validates("status")
    def validate_draft_status(self, key, value):
        if value not in (DRAFT, PUBLISHED):
            raise ValueError("status must be 'Draft' or 'Published'")
        return value

    def extra_publish_problems(self):
        """Override for cross-field rules. Return a list of messages."""
        return []

    def publish_problems(self):
        missing = [f for f in self.required_to_publish if is_blank(getattr(self, f, None))]
        problems = [f"missing: {', '.join(missing)}"] if missing else []
        return problems + self.extra_publish_problems()

    def publish(self):
        problems = self.publish_problems()
        if problems:
            raise ValueError("Can't publish: " + "; ".join(problems))
        self.status = PUBLISHED
        if self.published_at is None:        # keeps the original date if re-published
            self.published_at = datetime.now(timezone.utc)

    def unpublish(self):
        self.status = DRAFT