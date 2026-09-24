from models.HotelModels.BaseHotelModel import BaseHotelModel

from config import db

from relational_functions.one_to_many import one_to_many_back_populates

class PartnerHotelModel(BaseHotelModel): 
    __tablename__ = "partner_hotels"

    id = db.Column(db.Integer, primary_key = True)

    park = one_to_many_back_populates("ParkModel", "partner_hotels", delete_orphan=False) 