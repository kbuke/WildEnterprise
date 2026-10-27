from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from config import db 
from sqlalchemy.orm import validates

from functions.check_string import check_string
from functions.check_unique import check_unique

class BaseCardModel(BaseNameImgInfomodel):
    __abstract__ = True

    card_info = db.Column(db.String, nullable = False)

    primary_img_1 = db.Column(db.String, nullable = False)
    primary_img_2 = db.Column(db.String, nullable = False)
    primary_img_3 = db.Column(db.String, nullable = True)
    primary_img_4 = db.Column(db.String, nullable = True)
    primary_img_5 = db.Column(db.String, nullable = True)

    @validates("card_info", "primary_img_1", "primary_img_2")
    def validate_card_info_and_img(self, key, value):
        check_string(value)
        return check_unique(model=type(self), key=key, value=value)

    @validates("primary_img_3", "primary_img_4", "primary_img_5")
    def validate_hero_img(self, key, value):
        if key == "primary_img_3" and value:
            check_string(value)
            check_unique(model=type(self), key=key, value=value)
        if key != "primary_img_3" and self.primary_img_3:
            if not value:
                raise ValueError("Must give 5 images if using more than 2 images")
            check_string(value)
            check_unique(model=type(self), key=key, value=value)
        return value

    