from sqlalchemy.orm import validates

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

class AccomodationReview(db.Model):
    __tablename__ = "accomodation_reviews"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = True, default = "https://cdn-icons-png.flaticon.com/512/266/266033.png")
    rating = db.Column(db.Integer, nullable = False)
    review = db.Column(db.String, nullable = False)

    booking_id = one_to_many_fk("", True)
    park = one_to_many_back_populates("ParkModel", "reviews", delete_orphan=False)