from datetime import date, datetime

from functions.check_not_bool_or_none import check_not_bool_or_none

def check_event_dates(
    start_date,
    end_date = None
):
    today = date.today()

    check_not_bool_or_none(start_date)

    if not isinstance(start_date, date):
        try:
            start_date = datetime.strptime(
                start_date,
                "%Y-%m-%d"
            ).date()
        except TypeError:
            raise TypeError("Value must be of type date")

    if start_date < today:
        raise ValueError("You can not set an event for the past")

    if end_date:
        if isinstance(end_date, bool):
            raise ValueError("End date can not be a boolean")

        if not isinstance(end_date, date):
            try:
                end_date = datetime.strptime(
                    end_date,
                    "%Y-%m-%d"
                ).date()
            except ValueError:
                raise ValueError("End date must be of type date")
            
        if end_date < start_date:
            raise ValueError("End date can not be before start date")

    return (start_date, end_date)
        

    
