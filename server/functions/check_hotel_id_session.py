from flask import session

def check_hotel_id_session(value):
    if session.get("hotel_id") != value:
        return {"error": "Unauthorized"}, 403
    return None

def check_park_id_session(value):
    if session.get("park_id") != value:
        return {"error": "Unauthorized"}, 403
    return None