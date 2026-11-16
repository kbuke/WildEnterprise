from functools import wraps
from flask import session

def require_scanner_admin_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("is_scanner_admin"):
            return {"error": "Unauthorized"}, 401
        return f(*args, **kwargs)
    return wrapper