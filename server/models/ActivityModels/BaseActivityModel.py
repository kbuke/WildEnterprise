from sqlalchemy.orm import validates
from sqlalchemy.dialects.postgresql import ARRAY

from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_valid_value import check_valid_value

class BaseActivityModel(BaseNameImgInfomodel):
    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key = True)
    #=============================================================================================
    # SEASONAL CONSIDERATIONS
    #=============================================================================================
    all_year_round = db.Column(db.Boolean, nullable = False) # The event may not be available all year round
    available_months = db.Column(db.JSON, nullable = True)

    #=============================================================================================
    # PRICING CONSIDERATIONS
    #=============================================================================================
    free_with_stay = db.Column(db.Boolean, nullable = False) # Is this activity included in the price of a stay at a lodge?
    discount_with_stay = db.Column(db.Boolean, nullable = True) # Is there any dicount associated with staying at a lodge?
    stay_discount = db.Column(db.Float, nullable = True)
    price = db.Column(db.Float, nullable = False) # If no value is given it is free

    #=============================================================================================
    # RELATIONS
    #=============================================================================================
    park_id = one_to_many_fk(
        "parks",
        True
    )

    park = one_to_many_back_populates(
        "ParkModel",
        "activities",
        delete_orphan=False
    )

    #=============================================================================================
    # VALIDATIONS 
    #=============================================================================================
    @validates("available_months")
    def validate_months(self, key, value):
        if value is None:
            return value
        months = list(range(1, 13))
        for month in value:
            check_valid_value(months, month)
        return value

    @validates("discount_with_stay")
    def validate_discount_with_stay(self, key, value):
        if self.free_with_stay == True and value == True:
            raise ValueError("A discount for staying can not be applied if the activity is free if you stay")
        return value 

    @validates("stay_discount")
    def validate_discount(self, key, value):
        if self.discount_with_stay == True and (value is None or value < 0.01 or 0.99 < value):
            raise ValueError("If there is a discount available for staying it must be between 0.01 and 0.99")
        return value

    #=============================================================================================
    # SERIALIZE RULES
    #=============================================================================================
    serialize_rules = (
        "-park.activities",
        "-park.events",
        "-park.images",
    )