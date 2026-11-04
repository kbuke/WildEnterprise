from sqlalchemy.orm import validates

from config import db
from models.BaseCardModel import BaseCardModel
from models.mixins.draftable import DraftableMixin

from functions.check_string import check_string
from functions.check_unique import check_unique


class DraftableCardModel(DraftableMixin, BaseCardModel):
    __abstract__ = True

    # Same columns as the base classes, but nullable so a draft can be half-written
    name = db.Column(db.String, nullable=True)
    img = db.Column(db.String, nullable=True)
    info = db.Column(db.String, nullable=True)
    card_info = db.Column(db.String, nullable=True)
    primary_img_1 = db.Column(db.String, nullable=True)
    primary_img_2 = db.Column(db.String, nullable=True)

    required_to_publish = ("name", "img", "info", "card_info", "primary_img_1", "primary_img_2")

    @validates("card_info", "primary_img_1", "primary_img_2")
    def validate_card_info_and_img(self, key, value):
        if value is None:
            return None
        check_string(value)
        return check_unique(model=type(self), key=key, value=value)

    @validates("primary_img_3", "primary_img_4", "primary_img_5")
    def validate_hero_img(self, key, value):
        if value is None:
            return None
        check_string(value)
        return check_unique(model=type(self), key=key, value=value)

    def extra_publish_problems(self):
        extras = [self.primary_img_3, self.primary_img_4, self.primary_img_5]
        if any(extras) and not all(extras):
            return ["use either 2 hero images or all 5"]
        return []