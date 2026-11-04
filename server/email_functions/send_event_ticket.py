# email_functions/send_event_ticket.py
from collections import defaultdict
from datetime import datetime

from flask_mail import Message

from config import db, mail
from ticket_functions.create_ticket_qr import create_ticket_qr


def send_tickets_email(recipient, tickets):
    """One email to one address, with one QR code per ticket."""
    booking = tickets[0].booking
    event = booking.event
    is_booker = recipient.strip().lower() == booking.email.strip().lower()

    lines = "\n".join(f"- {t.attendee_name} ({t.ticket_ref})" for t in tickets)
    body = (
        f"Hi,\n\n"
        f"Your {'tickets are' if len(tickets) > 1 else 'ticket is'} confirmed for {event.name}.\n"
        f"Date: {event.start_date}  Time: {event.start_time:%H:%M}\n\n"
        f"{lines}\n\n"
        f"Show the QR code when you arrive. Each code works for one person, once.\n"
    )
    if len(tickets) > 1:
        body += "Forward each QR code to the guest it belongs to.\n"
    if is_booker:
        body += (
            f"\nBooking reference: {booking.booking_ref}\n"
            f"Keep this reference and this email address if you need to cancel a ticket.\n"
        )
        if booking.send_tickets_to_all and booking.no_of_people > len(tickets):
            body += "Your other guests were sent their tickets directly.\n"

    try:
        msg = Message(
            subject=f"Your {'tickets' if len(tickets) > 1 else 'ticket'} - {event.name}",
            recipients=[recipient],
            body=body,
        )
        for t in tickets:
            msg.attach(f"{t.ticket_ref}.png", "image/png", create_ticket_qr(t.ticket_ref))
        mail.send(msg)

        for t in tickets:
            t.email_status = "Sent"
            t.email_sent_at = datetime.now()
            t.email_error = None
        return True

    except Exception as e:
        for t in tickets:
            t.email_status = "Failed"
            t.email_error = str(e)[:500]
        return False


def send_event_ticket(ticket):
    """Resend one ticket (used by the admin PATCH)."""
    return send_tickets_email(ticket.attendee_email, [ticket])


def send_booking_tickets(booking):
    """Groups tickets by address: one email in single mode, one per guest in separate mode."""
    groups = defaultdict(list)
    for t in booking.active_tickets:
        groups[t.attendee_email.strip().lower()].append(t)

    for tickets in groups.values():
        send_tickets_email(tickets[0].attendee_email, tickets)

    db.session.commit()