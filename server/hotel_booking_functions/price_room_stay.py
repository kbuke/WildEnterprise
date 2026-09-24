from datetime import timedelta

from sqlalchemy import or_, and_

from config import db
from models.HotelModels.WildEnterpriseHotels.RoomRateModel import RoomRateModel
from models.HotelModels.WildEnterpriseHotels.DiscountModel import DiscountModel


def _nightly_rate(room, night):
    """Pick the single best applicable rate for one night: room-specific
    beats hotel-wide; among ties, highest priority wins."""
    candidates = RoomRateModel.query.filter(
        or_(
            RoomRateModel.room_id == room.id,
            and_(RoomRateModel.hotel_id == room.hotel_id, RoomRateModel.room_id.is_(None))
        ),
        RoomRateModel.start_date <= night,
        RoomRateModel.end_date >= night,
    ).all()

    if not candidates:
        return room.base_price

    best = sorted(
        candidates,
        key=lambda r: (r.room_id is not None, r.priority),
        reverse=True
    )[0]

    if best.modifier_type == "fixed":
        return room.base_price + best.value
    return room.base_price * best.value  # "multiplier" (or default) convention


def _best_discount(room, arrival, departure, booking_date):
    """Single best applicable discount for the whole stay: room-specific
    beats hotel-wide; among ties, highest priority wins."""
    candidates = DiscountModel.query.filter(
        or_(
            DiscountModel.room_id == room.id,
            and_(DiscountModel.hotel_id == room.hotel_id, DiscountModel.is_hotel_wide_discount.is_(True))
        )
    ).all()

    applicable = []
    for d in candidates:
        if d.discount_based_on_booking:
            if d.booking_start_date and d.booking_end_date:
                if d.booking_start_date <= booking_date <= d.booking_end_date:
                    applicable.append(d)
        else:
            if d.stay_start_date and d.stay_end_date:
                if d.stay_start_date <= arrival and departure <= d.stay_end_date:
                    applicable.append(d)

    if not applicable:
        return None

    return sorted(
        applicable,
        key=lambda d: (d.room_id is not None, d.priority),
        reverse=True
    )[0]


def price_room_stay(room, arrival_date, departure_date, booking_date=None):
    """Total price for ONE unit of this room type across the whole stay."""
    from datetime import date
    booking_date = booking_date or date.today()

    nights = (departure_date - arrival_date).days
    subtotal = sum(
        _nightly_rate(room, arrival_date + timedelta(days=i))
        for i in range(nights)
    )

    discount = _best_discount(room, arrival_date, departure_date, booking_date)
    if discount:
        subtotal *= (1 - discount.percentage_off)

    return round(subtotal, 2)