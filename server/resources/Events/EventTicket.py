from flask import request
from flask_restful import Resource

from sqlalchemy.exc import IntegrityError

from config import db

from models.EventModels.EventTicketModel import EventTicketModel

from event_functions.check_in_ticket import check_in_ticket
from email_functions.send_event_ticket import send_event_ticket

from decorators.require_admin_login import require_admin_login

from schemas.event_bookings import EventTicketAdminSchema

# The only fields an admin may change on a ticket
ALLOWED_FIELDS = {
    "attendeeName": "attendee_name",
    "attendeeEmail": "attendee_email",
}


class AllEventTickets(Resource):

    @require_admin_login
    def get(self):
        tickets = EventTicketModel.query.order_by(EventTicketModel.id.desc()).all()

        return EventTicketAdminSchema(many=True).dump(tickets), 200


class SpecificEventTicket(Resource):

    # Admin only: a ticket id is guessable and the schema includes the ticket reference
    @require_admin_login
    def get(self, id):
        ticket = EventTicketModel.query.get(id)

        if not ticket:
            return {"error": f"Event ticket {id} not found"}, 404

        return EventTicketAdminSchema().dump(ticket), 200

    @require_admin_login
    def patch(self, id):
        ticket = EventTicketModel.query.get(id)

        if not ticket:
            return {"error": f"Event ticket {id} not found"}, 404

        if ticket.status != "Valid":
            return {"error": f"A {ticket.status.lower()} ticket can't be edited"}, 400

        data = request.get_json()

        if not data:
            return {"error": "Missing JSON data"}, 400

        changes = {
            attr: data[key]
            for key, attr in ALLOWED_FIELDS.items()
            if key in data
        }

        if not changes:
            return {"error": "No valid fields to update"}, 400

        try:
            for attr, value in changes.items():
                setattr(ticket, attr, value)     # model validators check name and email

            db.session.commit()                  # save the details first

            # Resend the ticket to the (possibly new) address.
            # send_event_ticket records Sent or Failed on the ticket itself.
            email_sent = send_event_ticket(ticket)
            db.session.commit()

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": str(e)}, 400

        message = (
            "Ticket details updated and email sent"
            if email_sent
            else "Ticket details updated but the email failed to send"
        )

        return {
            "message": message,
            "ticket": EventTicketAdminSchema().dump(ticket)
        }, 200


class CheckInTicket(Resource):

    # Staff scan tickets while logged in, so strangers can't check tickets in
    @require_admin_login
    def post(self):
        data = request.get_json()

        if not data:
            return {"error": "Missing JSON data"}, 400

        ticket_ref = data.get("ticketRef")

        if not ticket_ref:
            return {"error": "ticketRef is required"}, 400

        ticket = EventTicketModel.query.filter_by(
            ticket_ref=str(ticket_ref).strip()
        ).first()

        if not ticket:
            return {"error": "Invalid ticket"}, 404

        try:
            check_in_ticket(ticket)
            db.session.commit()

        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 400

        return {
            "message": "Ticket successfully checked in",
            "ticket": EventTicketAdminSchema().dump(ticket)
        }, 200

# from flask import request
# from flask_restful import Resource

# from models.EventModels.EventTicketModel import EventTicketModel
# from config import db

# from event_functions.check_in_ticket import check_in_ticket
# from email_functions.send_event_ticket import send_event_ticket

# from decorators.require_admin_login import require_admin_login

# from sqlalchemy.exc import IntegrityError

# from schemas.event_bookings import EventTicketAdminSchema

# from decorators.require_admin_login import require_admin_login


# class AllEventTickets(Resource):

#     @require_admin_login
#     def get(self):
#         tickets = EventTicketModel.query.all()

#         return [
#             ticket.to_dict()
#             for ticket in tickets
#         ], 200


# class SpecificEventTicket(Resource):

#     @require_admin_login
#     def get(self, id):

#         ticket = EventTicketModel.query.filter(
#             EventTicketModel.id == id
#         ).first()

#         if not ticket:
#             return {
#                 "error": f"Event ticket {id} not found"
#             }, 404

#         return ticket.to_dict(), 200

#     @require_admin_login
#     def patch(self, id):

#         ticket = EventTicketModel.query.filter(
#             EventTicketModel.id == id
#         ).first()

#         if not ticket:
#             return {
#                 "error": f"Event ticket {id} not found"
#             }, 404

#         data = request.get_json()

#         if not data:
#             return {
#                 "error": "Missing JSON data"
#             }, 400

#         allowed_fields = {
#             "attendee_name",
#             "attendee_email"
#         }

#         data = {
#             key: value
#             for key, value in data.items()
#             if key in allowed_fields
#         }

#         if not data:
#             return {
#                 "error": "No valid fields to update"
#             }, 400

#         try:

#             for key, value in data.items():
#                 setattr(ticket, key, value)

#             db.session.commit()

#             email_sent = send_event_ticket(ticket)

#             db.session.commit()

#             if email_sent:
#                 return {
#                     "message": "Ticket details updated and email sent",
#                     "ticket": ticket.to_dict()
#                 }, 202

#             return {
#                 "message": "Ticket details updated but email failed to send",
#                 "ticket": ticket.to_dict()
#             }, 202

#         except (ValueError, IntegrityError) as e:

#             db.session.rollback()

#             return {
#                 "error": str(e)
#             }, 400


# class CheckInTicket(Resource):

#     @require_admin_login
#     def post(self):

#         data = request.get_json()

#         if not data:
#             return {
#                 "error": "Missing JSON data"
#             }, 400

#         ticket_ref = data.get("ticketRef")

#         if not ticket_ref:
#             return {
#                 "error": "ticketRef is required"
#             }, 400

#         ticket = EventTicketModel.query.filter_by(
#             ticket_ref=ticket_ref
#         ).first()

#         if not ticket:
#             return {
#                 "error": "Invalid ticket"
#             }, 404

#         try:

#             check_in_ticket(ticket)

#             db.session.commit()

#             return {
#                 "message": "Ticket successfully checked in",
#                 "ticket": ticket.to_dict()
#             }, 200

#         except ValueError as e:

#             db.session.rollback()

#             return {
#                 "error": str(e)
#             }, 400