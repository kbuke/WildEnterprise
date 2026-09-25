from functions.check_not_bool_or_none import check_not_bool_or_none

from datetime import date, datetime

def check_valid_date(selected_date):
    check_not_bool_or_none(selected_date)

    if not isinstance(selected_date, date):
        try:
            selected_date = datetime.strptime(
                selected_date,
                "%Y-%m-%d"
            ).date()
        except TypeError:
            raise TypeError("Value must be of type date")


    return selected_date