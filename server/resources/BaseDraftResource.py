from flask import request
from sqlalchemy.exc import IntegrityError

from config import db
from resources.BaseResource import BaseResource
from models.mixins.draftable import DRAFT, PUBLISHED, is_blank
from relational_functions.many_to_many import set_many_to_many


class BaseDraftResource(BaseResource):
    # {"articleIds": ("articles", ArticleModel)}
    relations = {}
    # Attributes that must exist even on a draft
    always_required = ("name",)

    # ------------------------------------------------------------------
    # Public reads: published only
    # ------------------------------------------------------------------
    def get_published(self):
        rows = (self.model.query.filter_by(status=PUBLISHED)
                .order_by(self.model.published_at.desc()).all())
        return self.schema(many=True).dump(rows), 200

    def get_published_specific(self, id):
        row = self.model.query.filter_by(id=id, status=PUBLISHED).first()
        if not row:
            return {"error": f"{self.model.__name__} {id} not found"}, 404
        return self._detail().dump(row), 200

    # ------------------------------------------------------------------
    # Writes
    # ------------------------------------------------------------------
    def _apply(self, record, data):
        # Only whitelisted keys from field_map are copied. status is never in field_map
        for key, attr in self.field_map.items():
            if key in data:
                value = data[key]
                if isinstance(value, str):
                    value = value.strip() or None
                setattr(record, attr, value)

        for key, (attr, rel_model) in self.relations.items():
            set_many_to_many(record, attr, rel_model, data.get(key))

        status = data.get("status")
        if status == DRAFT:
            record.unpublish()
        elif status == PUBLISHED:
            record.publish()
        elif status is not None:
            raise ValueError("status must be 'Draft' or 'Published'")
        elif record.status == PUBLISHED:
            record.publish()   # a live item can't be edited into an invalid state

        for attr in self.always_required:
            if is_blank(getattr(record, attr, None)):
                raise ValueError(f"{attr} is required, even for a draft")

    def _save(self, record, data, is_new):
        try:
            with db.session.no_autoflush:      # validators query the DB mid-build
                self._apply(record, data)
            if is_new:
                db.session.add(record)
            db.session.commit()
        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": str(e)}, 400
        return self._detail().dump(record), 201 if is_new else 200

    def post_draft(self):
        data = request.get_json()
        if not data:
            return {"error": "Missing JSON Data"}, 400
        return self._save(self.model(), data, is_new=True)

    def patch_draft(self, id):
        record = self.model.query.get(id)
        if not record:
            return {"error": f"{self.model.__name__} {id} not found"}, 404
        data = request.get_json()
        if not data:
            return {"error": "Missing JSON Data"}, 400
        return self._save(record, data, is_new=False)