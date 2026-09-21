# from sqlalchemy.orm import validates
# from sqlalchemy_serializer import SerializerMixin

# from config import db 

# import uuid

# class ActivityBookingModel(db.Model, SerializerMixin):
#     __tablename__ = "activity_booking"

#     id = db.Column(db.Integer, primary_key = True)
#     booking_reference = db.Column(db.String, unique=True, nullable = False,
#                                   default=lambda: f"ACT-{uuid.uuid4().hex[:8].upper()}")
#     date = db.Column(db.Date, nullable=False)