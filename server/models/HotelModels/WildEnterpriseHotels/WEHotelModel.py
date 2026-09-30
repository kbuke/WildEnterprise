from models.HotelModels.BaseHotelModel import BaseHotelModel

from relational_functions.one_to_many import one_to_many_back_populates

from config import db

class WEHotelModel(BaseHotelModel):
    __tablename__ = "wildenterprise_hotels"

    id = db.Column(db.Integer, primary_key = True)

    #========================================================================
    # RELATIONS
    #========================================================================
    park = one_to_many_back_populates(
        "ParkModel",
        "hotels",
        delete_orphan=False
    )
    
    rooms = one_to_many_back_populates(
        "RoomModel",
        "hotel",
        True
    )
    
    room_rates = one_to_many_back_populates(
        "RoomRateModel",
        "hotel",
        delete_orphan=True
    )

    discounts = one_to_many_back_populates(
        "DiscountModel",
        "hotel",
        delete_orphan=True
    )

    lead_times = one_to_many_back_populates(
        "LeadTimeRuleModel", 
        "hotel", 
        delete_orphan=True
    )

    hotel_bookings = one_to_many_back_populates(
        "WEHotelBookingModel",
        "hotel",
        delete_orphan=True
    )