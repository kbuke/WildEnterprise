from config import db

from models.HotelModels.WildEnterpriseHotels.RoomBookingModel import RoomBookingModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import BookingModel

def get_booked_quantity(
    room_id,
    arrival_date,
    departure_date,
    exclude_booking_id = None
):
    query = (
        db.session.query(db.func.coalesce(db.func.sum(RoomBookingModel.quantity), 0))
        .join(BookingModel, RoomBookingModel.booking_id == BookingModel.id)
        .filter(
            RoomBookingModel.room_id == room_id,
            BookingModel.arrival_date < departure_date,
            BookingModel.departure_date > arrival_date
        )
    )

    if exclude_booking_id:
        query = query.filter(BookingModel.id != exclude_booking_id)
    return query.scalar()