from models.SiteModel import SiteModel
from models.AnimalModel import AnimalModel
from models.SiteAnimalsModel import SiteAnimalsModel
from models.BlogModel import BlogModel
from models.SiteBlogModel import SiteBlogModel

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
        "info": "The South African lion (Panthera leo melanochaita) is one of the largest and most iconic apex predators in Africa. Adult males weigh up to 225 kg and are easily recognized by their massive, dark manes. They are a keystone species for local ecosystems and a major driver of the country's ecotourism",
        "endangered_level": "Vulnerable",
        "animal_type": "Big Cats",
        "big_five": True
    },

    {
        "name": "White Rhino",
        "img": "https://plus.unsplash.com/premium_photo-1664304381042-c161828efeb1?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "info": "The white rhinoceros, also known as the white rhino or square-lipped rhinoceros, is the largest extant species of rhinoceros and the most social of all rhino species, characterized by its wide mouth adapted for grazing.",
        "endangered_level": "Critically Endangered",
        "animal_type": "Large Mammals",
        "big_five": True
    },

    {
        "name": "African Wild Dog",
        "img": "https://images.unsplash.com/photo-1713888478501-1caea7b9cda4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "info": "The African wild dog, also called painted dog and Cape hunting dog, is a wild canine native to sub-Saharan Africa.",
        "endangered_level": "Critically Endangered",
        "animal_type": "Carnivores",
        "big_five": False
    },

    {
        "name": "African Leopard",
        "img": "https://plus.unsplash.com/premium_photo-1661952443167-05d723e6bb3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "info": "The African leopard is the nominate subspecies of the leopard, native to Africa. It is widely distributed in most of sub-Saharan Africa, but the historical range has been fragmented in the course of habitat conversion. Leopards have also been recorded in North Africa as well.",
        "endangered_level": "Endangered",
        "animal_type": "Big Cats",
        "big_five": True
    }
]

def seed_animals():
    animals = [AnimalModel(**data) for data in ANIMALS]
    db.session.add_all(animals)
    db.session.commit()
    print(f"Seeded {len(animals)} animals")

# ----------------------------- Seed Site Animals -----------------------------
SITE_ANIMALS = [
    {
        "animal_id": 1,
        "site_id": 1
    },

    {
        "animal_id": 2,
        "site_id": 1
    },

    {
        "animal_id": 3,
        "site_id": 1
    },

    {
        "animal_id": 4,
        "site_id": 1
    }
]

def seed_site_animals():
    site_animals = [SiteAnimalsModel(**data) for data in SITE_ANIMALS]
    db.session.add_all(site_animals)
    db.session.commit()
    print(f"Seeded {len(site_animals)} site animals")

# ----------------------------- Seed Blogs -----------------------------
BLOGS = [
    {
        "title": "Baloon Rides Over Animals",
        "cover_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPG3dpl3QcUHQTRZAKOXicOdNlisheBiv8hEFn1RB5yCgVlgq9-SQSq8sq&s=10",
        "content": "Experience the beauty of the African wilderness from a completely different perspective with a hot air balloon safari. As the sun rises over the landscape, guests gently float above the plains, enjoying breathtaking panoramic views of the park and its incredible wildlife. Unlike traditional game drives, a hot air balloon offers a peaceful and quiet journey through the skies. The absence of engine noise allows animals to continue their natural behaviour, giving visitors a unique opportunity to observe elephants, giraffes, zebras, antelope, and even predators such as lions from above without disturbing them. Each flight is led by experienced, licensed pilots who prioritize both passenger safety and wildlife conservation. Flights typically take place in the early morning when weather conditions are calm and the wildlife is most active. After landing, many safari parks conclude the experience with a light breakfast or refreshments in the bush, creating an unforgettable start to the day. Hot air balloon safaris are suitable for couples, families with older children, photographers, and anyone seeking a memorable adventure. They provide spectacular opportunities to capture stunning aerial photographs while appreciating the vastness and diversity of the African landscape. Whether it is your first visit to a safari park or a return to the wild, a hot air balloon safari offers an unforgettable experience that combines adventure, tranquillity, and a deeper appreciation for nature.",
        "status": "Published"
    },

    {
        "title": "Pangolin Numbers Increasing",
        "cover_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDypouEA8WHpDpgvKtdBLF6JCrMA3_YnHHUcd06BBubfm0zsd0FSVuDQZJby4pm9lLcW6jyTgAACqPwf6aKOUJlAYes_d6ua83RDGwbA&s=10",
        "content": "Pangolins are among the world's rarest and most threatened mammals. Although exact population numbers are difficult to determine because they are solitary, nocturnal, and highly secretive, all eight species of pangolin are experiencing population declines. The greatest threats to pangolins are illegal wildlife trafficking, habitat loss, and poaching for their scales and meat. As a result, every pangolin species is protected under international law, with several species listed as Critically Endangered or Endangered. Safari parks and wildlife reserves play an important role in pangolin conservation by protecting natural habitats, supporting research, and assisting with the rescue and rehabilitation of injured or trafficked animals. Every sighting of a pangolin in the wild is considered a special privilege and serves as a reminder of the importance of protecting these remarkable creatures for future generations.",
        "status": "Published"
    },

    {
        "title": "Lion King Review",
        "cover_photo": "https://m.media-amazon.com/images/M/MV5BNTQxNzU4NTY2OF5BMl5BanBnXkFtZTcwNzQ2NTI3Ng@@._V1_.jpg",
        "content": "The Lion King is one of Disney's most beloved animated films, celebrated for its memorable characters, breathtaking African-inspired landscapes, and unforgettable soundtrack. The story follows Simba, a young lion who embarks on a journey of courage, responsibility, and self-discovery as he learns what it truly means to be king. With stunning animation, emotional storytelling, and iconic songs such as Circle of Life and Hakuna Matata, the film continues to captivate audiences of all ages. Its themes of family, friendship, and the balance of nature make it both entertaining and meaningful. Whether you're watching it for the first time or revisiting a childhood favourite, The Lion King remains a heartwarming adventure that has earned its place as one of the greatest animated films ever made.",
        "status": "Draft"
    }
]

def seed_articles():
    articles = [BlogModel(**data) for data in BLOGS]
    db.session.add_all(articles)
    db.session.commit()
    print(f"Seeded {len(articles)} blogs")

# ----------------------------- Seed Site Blogs -----------------------------
SITE_BLOGS = [
    {
        "site_id": 1,
        "blog_id": 1
    },

    {
        "site_id": 1,
        "blog_id": 2
    }
]

def seed_site_articles():
    site_articles = [SiteBlogModel(**data) for data in SITE_BLOGS]
    db.session.add_all(site_articles)
    db.session.commit()
    print(f"Seeded {len(site_articles)} site articles")

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

# -----------------------------  -----------------------------

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_sites()
        seed_animals()
        seed_site_animals()
        seed_articles()
        seed_site_articles()
