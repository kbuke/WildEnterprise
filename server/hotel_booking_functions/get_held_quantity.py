from datetime import datetime
from config import db
from models.HotelModels.RoomHoldModel import RoomHoldModel

def get_held_quantity(room_id, arrival_date, departure_date, exclude_session_token=None):
    query = (
        db.session.query(db.func.coalesce(db.func.sum(RoomHoldModel.quantity), 0))
        .filter(
            RoomHoldModel.room_id == room_id,
            RoomHoldModel.expires_at > datetime.utcnow(),
            RoomHoldModel.arrival_date < departure_date,
            RoomHoldModel.departure_date > arrival_date,
        )
    )
    if exclude_session_token:
        query = query.filter(RoomHoldModel.session_token != exclude_session_token)
    return query.scalar()