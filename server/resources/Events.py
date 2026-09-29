from models.EventModel import EventModel
from resources.BaseResource import BaseResource

from flask import request

from decorators.require_admin_login import require_admin_login

from schemas.events import EventSchema, EventDescriptionSchema

class BaseEvents(BaseResource):
    model = EventModel

    schema = EventSchema

    detail_schema = EventDescriptionSchema

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "startDate": "start_date",
        "multiDayEvent": "multi_day_event",
        "endDate": "end_date",
        "startTime": "start_time",
        "endTime": "end_time",
        "noOfTickets": "no_of_tickets",
        "ticketPrice": "ticket_price",
        "parkId": "park_id"
    }

class AllEvents(BaseEvents):
    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        data = request.get_json()

        if not data or "noOfTickets" not in data:
            return {"error": "Missing JSON Data"}, 400

        data["tickets_remaining"] = data["noOfTickets"]
        data["tickets_sold"] = 0
        
        return self.post_instance()

class SpecificEvent(BaseEvents):
    def get(self, id):
        return self.get_specific(id)

    @require_admin_login
    def patch(self, id):
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)