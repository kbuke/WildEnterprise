from datetime import date, datetime

from functions.check_event_dates import check_event_dates

def check_hotel_dates(
    start_date, 
    end_date
):
    if end_date is None:
        raise ValueError("Must enter a date for end_date")

    if start_date == end_date:
        raise ValueError("End date must be at least one day after start date")
    
    return check_event_dates(start_date, end_date)