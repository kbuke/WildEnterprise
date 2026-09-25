from datetime import timedelta, date

def calculate_deposit_date(context):
    arrival = context.get_current_parameters()["arrival"]
    two_weeks_before = arrival - timedelta(weeks=2)
    today = date.today()

    if two_weeks_before > today:
        return two_weeks_before

    return today