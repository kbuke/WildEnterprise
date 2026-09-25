from app import app 
from config import db 
import models

from models.ParkModels import ParkModel
from models.ParkImgModel import ParkImgModel
from models.EventModel import EventModel
from models.ActivityModels.BaseActivityModel import BaseActivityModel
from models.ActivityModels.ActivityBookingModel import ActivityBookingModel
from models.ActivityModels.WalkingTrailModel import WalkingTrailModel
from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel
from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from models.HotelModels.PartnerHotels.PartnerHotelBookingsModel import PartnerHotelBookingModel
from models.HotelModels.PartnerHotels.PartnerHotelModel import PartnerHotelModel

from datetime import date, time

#========================================================================
# PARKS
#========================================================================
PARKS = [
    {
        "name": "Dartmoor",
        "img": "It's coming",
        "info": "It's coming",
        "location": "KwaZulu-Natal"
    }
]

def seed_parks():
    parks = [ParkModel(**data) for data in PARKS]
    db.session.add_all(parks)
    db.session.commit()
    print(f"Seeded {len(parks)} Parks")

#========================================================================
# PARK IMAGES
#========================================================================
PARK_IMG = [
    {
        "img": "Uploading later",
        "park_id": 1
    }
]

def seed_park_images():
    park_images = [ParkImgModel(**data) for data in PARK_IMG]
    db.session.add_all(park_images)
    db.session.commit()
    print(f"Seeded {len(park_images)} Images")

#========================================================================
# EVENTS
#========================================================================
EVENTS = [
    {
        "name": "Cycle Race",
        "img": "LATER",
        "info": "Cycle through Dartmoor",
        "start_date": date(2026, 10, 24),
        "multi_day_event": False,
        "start_time": time(9, 0),
        "end_time": time(16, 0),
        "no_of_tickets": 20,
        "tickets_remaining": 20,
        "ticket_price": 45.00,
        "park_id": 1,
    },

    {
        "name": "Running Race",
        "img": "LATER",
        "info": "Run through Dartmoor",
        "start_date": date(2027, 10, 24),
        "multi_day_event": True,
        "end_date": date(2027, 10, 25),
        "start_time": time(9, 0),
        "end_time": time(16, 0),
        "no_of_tickets": 20,
        "tickets_remaining": 20,
        "ticket_price": 45.00,
        "park_id": 1,
    }
]

def seed_events():
    events = [EventModel(**data) for data in EVENTS]
    db.session.add_all(events)
    db.session.commit()
    print(f"Seeded {len(events)} Events")

#========================================================================
# ACTIVITIES 
#========================================================================
ACTIVITIES = [
    {
        "name": "Fishing",
        "img": "Later",
        "info": "Coming soon as well, I promise",
        "all_year_round": True,
        "free_with_stay": False,
        "discount_with_stay": True,
        "stay_discount": 0.4,
        "price": 230.00,
        "park_id": 1
    },

    {
        "name": "Cycling",
        "img": "Later",
        "info": "Coming soon as well, I promise",
        "all_year_round": False,
        "available_months": [1, 2, 3, 4, 11, 12],
        "free_with_stay": True,
        "discount_with_stay": False, 
        "price": 230.00,
        "park_id": 1
    },

     {
        "name": "Swimming",
        "img": "Later",
        "info": "Coming soon as well, I promise",
        "all_year_round": True,
        "free_with_stay": False,
        "discount_with_stay": False, 
        "price": 230.00,
        "park_id": 1
    },
]

def seed_activities():
    activities = [BaseActivityModel(**data) for data in ACTIVITIES]
    db.session.add_all(activities)
    db.session.commit()
    print(f"Seeded {len(activities)} Activities")

#========================================================================
# SEED WALKS
#========================================================================
WALKS = [
    {
        "name": "Route-1",
        "img": "Later",
        "info": "Coming soon as well, I promise",
        "all_year_round": True,
        "free_with_stay": True,
        "discount_with_stay": False,
        "price": 230.00,
        "park_id": 1,
        "map": "It's also coming",
        "code_of_conduct": "It will be here soon"
    }
]

def seed_walks():
    walks = [WalkingTrailModel(**data) for data in WALKS]
    db.session.add_all(walks)
    db.session.commit()
    print(f"Seeded {len(walks)} Walks")

#========================================================================
# HOTELS 
#========================================================================
HOTELS = [
    {
        "name": "Test Hotel",
        "img": "later mate",
        "info": "It's coming",
        "email": "test@gmail.com",
        "password_hash": "tester123",
        "park_id": 1
    },

    {
        "name": "Newer Hotel",
        "img": "nerwer mate",
        "info": "It's coming soon",
        "email": "tester@gmail.com",
        "password_hash": "tester123",
        "park_id": 1
    }
]

def seed_hotels():
    hotels = [WEHotelModel(**data) for data in HOTELS]
    db.session.add_all(hotels)
    db.session.commit()
    print(f"Seeded {len(hotels)} Hotels")

#========================================================================
# SEED ROOMS 
#========================================================================
ROOMS = [
    {
        "name": "Single Room",
        "img": "img",
        "no_of_rooms": 6,
        "max_people": 1,
        "base_price": 220.80,
        "hotel_id": 1
    }
]

def seed_rooms():
    rooms = [RoomModel(**data) for data in ROOMS]
    db.session.add_all(rooms)
    db.session.commit()
    print(f"Seeded {len(rooms)} Rooms")

#========================================================================
# SEED MODELS
#========================================================================
if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_parks()
        seed_park_images()
        seed_events()
        seed_activities()
        seed_walks()
        seed_hotels()
        seed_rooms()