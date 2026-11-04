# ticket_functions/create_ticket_qr.py
import io
import qrcode


def create_ticket_qr(ticket_ref):
    """Returns the PNG as bytes, ready to attach to an email."""
    buffer = io.BytesIO()
    qrcode.make(ticket_ref).save(buffer, format="PNG")
    return buffer.getvalue()