from config import db

from models.HotelModels.WildEnterpriseHotels.RoomBookingModel import RoomBookingModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel

def get_booked_quantity(
    room_id,
    arrival_date,
    departure_date,
    exclude_booking_id = None
):
    query = (
        db.session.query(db.func.coalesce(db.func.sum(RoomBookingModel.quantity), 0))
        .join(WEHotelBookingModel, RoomBookingModel.booking_id == WEHotelBookingModel.id)
        .filter(
            RoomBookingModel.room_id == room_id,
            WEHotelBookingModel.arrival < departure_date,
            WEHotelBookingModel.departure > arrival_date
        )
    )

    if exclude_booking_id:
        query = query.filter(WEHotelBookingModel.id != exclude_booking_id)
    return query.scalar()