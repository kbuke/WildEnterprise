from flask import session

def check_hotel_id_session(hotel_type, value):
    if hotel_type not in ["Partner", "WildEnterprise"]:
        raise ValueError("hotel_type must either be 'Partner' or 'WildEnterprise'")
    if hotel_type == "Partner":
        if session.get("partner_hotel_id") != value:
            return {"error": "Unauthorized"}, 403
        return None 
    if session.get("hotel_id") != value:
        return {"error": "Unauthorized"}, 403 
    return None