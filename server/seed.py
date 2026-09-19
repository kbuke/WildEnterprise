from app import app 
from config import db 

from models.ParkModels import ParkModel
from models.ParkImgModel import ParkImgModel
from models.EventModel import EventModel

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
# SEED MODELS
#========================================================================
if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_parks()
        seed_park_images()
        seed_events()