from functools import wraps
from flask import session 

def require_park_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "park_id" not in session:
            return {"error": "Unauthorized"}, 401 
        return f(*args, **kwargs)
    return wrapper