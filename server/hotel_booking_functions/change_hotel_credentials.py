from flask import request

from sqlalchemy.exc import IntegrityError

from decorators.require_hotel_login import require_hotel_login
from functions.check_hotel_id_session import check_hotel_id_session

from config import db

@require_hotel_login
def change_hotel_credentials(model_name, id):
        error = check_hotel_id_session(id)
        if error:
            return error

        hotel = model_name.query.get(id)
        if not hotel:
            return {"error": f"Hotel {id} not found"}, 404

        data = request.get_json()

        if not data.get("newEmail") and not data.get("newPassword"):
            return {"error": "Please provide a new email or a new password"}, 400

        if not hotel.authenticate(data.get("currentPassword", "")):
            return {"error": "Current password is not correct"}, 401

        try:
            if data.get("newEmail"):
                hotel.email = data["newEmail"]
            if data.get("newPassword"):
                hotel.password_hash = data["newPassword"]

            db.session.commit()
            return hotel.to_dict(), 200

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400