import os 
from flask import request, session
from flask_restful import Resource

from config import bcrypt

# Any change to email or passwords should be done in console, very secure.

class ScannerLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password", "")

        scan_email = os.getenv("qr_scan_email")
        scan_pw = os.getenv("qr_scan_password")

        if email != scan_email or not bcrypt.check_password_hash(scan_pw, password):
            return {"error": "Invalid email or password"}, 401 

        session["is_scanner_admin"] = True
        return {"email": scan_email, "is_scanner_admin": True}, 200 

class ScannerLogout(Resource):
    def delete(self):
        session.pop("is_scanner_admin", None)
        return {}, 204 

class ScannerCheckSession(Resource):
    def get(self):
        if not session.get("is_scanner_admin"):
            return {"error": "Not logged in"}, 401
        return {"email": os.getenv("qr_scan_email"), "is_scanner_admin": True}, 200