from functools import wraps
from flask import session

def require_partner_hotel_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "partner_hotel_id" not in session:
            return {"error": "Unauthorized"}, 401 
        return f(*args, **kwargs)
    return wrapper