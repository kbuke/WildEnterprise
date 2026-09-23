from flask import request

from hotel_booking_functions.check_hotel_dates import check_hotel_dates

def check_retrieve_dates(
    data,
    passed_start_date,
    passed_end_date
):

    start_date, end_date = check_hotel_dates(
        data[passed_start_date],
        data[passed_end_date]
    )

    data[passed_start_date] = start_date
    data[passed_end_date] = end_date

    return(data[passed_start_date], data[passed_end_date])

    # return (start_date, end_date)