from models.SiteModel import SiteModel
from models.AnimalModel import AnimalModel

from app import app 
from config import db 

# ----------------------------- Seed Sites -----------------------------
SITES = [
    {
        "name": "Dartmoor",
        "location": "KwaZulu-Natal, South Africa",
        "intro": "Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife.",
        "head_img": "https://i.ibb.co/LXwCxHnc/KT-190611-Wild-Trust-Reflections-Shoot-8109661.jpg",
        "info": "Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife. Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife. Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife.",
        "primary_img_1": "https://i.ibb.co/PRYvcvP/KT-190611-Wild-Trust-Reflections-Shoot-9203.jpg",
        "primary_img_2": "https://i.ibb.co/S2Pw6QG/Dartmoor-114.jpg",
        "primary_img_3": "https://i.ibb.co/7JX9VHCg/Dartmoor-39.jpg" 
    }
]
# "https://i.ibb.co/8DNPm4Xn/Dartmoor-26.jpg"

def seed_sites():
    sites = [SiteModel(**data) for data in SITES]
    db.session.add_all(sites)
    db.session.commit()
    print(f"Seeded {len(sites)} sites")

# ----------------------------- Seed Animals -----------------------------
ANIMALS = [
    {
        "name": "South African Lion",
        "img": "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "info": "The South African lion (Panthera leo melanochaita) is one of the largest and most iconic apex predators in Africa. Adult males weigh up to 225 kg and are easily recognized by their massive, dark manes. They are a keystone species for local ecosystems and a major driver of the country's ecotourism"
    }
]

def seed_animals():
    animals = [AnimalModel(**data) for data in ANIMALS]
    db.session.add_all(animals)
    db.session.commit()
    print(f"Seeded {len(animals)} animals")

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_sites()
        seed_animals()
