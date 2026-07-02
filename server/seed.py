from models.SiteModel import SiteModel

from app import app 
from config import db 

# ----------------------------- Seed Sites -----------------------------
SITES = [
    {
        "name": "Dartmoor",
        "location": "KwaZulu-Natal, South Africa",
        "intro": "Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife.",
        "head_img": "https://i.ibb.co/LXwCxHnc/KT-190611-Wild-Trust-Reflections-Shoot-8109661.jpg",
        "info": "Dartmoor is a vital 700-hectare farm and nature reserve integrated into the greater Karkloof Nature Reserve. Managed by the WILDTRUST, it acts as a sanctuary for endangered mistbelt grasslands, wetlands, and local wildlife.",
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

# -----------------------------  -----------------------------

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
