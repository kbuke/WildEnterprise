import pytest

from hotel_booking_functions.check_hotel_dates import check_hotel_dates

from datetime import date, timedelta

class TestCheckHotelDates():
    today = date.today()

    def test_no_end_date(self):
        with pytest.raises(ValueError):
            check_hotel_dates(date(2028, 10, 2), None)

    def test_end_date_before_start_date(self):
        with pytest.raises(ValueError):
            check_hotel_dates(self.today, self.today - timedelta(days=1))

    def test_end_date_equal_start_date(self):
        with pytest.raises(ValueError):
            check_hotel_dates(self.today, self.today)

    def test_end_date_after_start_date(self):
        assert check_hotel_dates(self.today, self.today + timedelta(days=1)) == (self.today, self.today + timedelta(days=1))

    def test_start_date_before_today(self):
        yesterday = self.today - timedelta(days=1)
        with pytest.raises(ValueError):
            check_hotel_dates(yesterday, self.today + timedelta(days=2))

    def test_string_dates(self):
        check_hotel_dates("2028-09-02", "2028-09-03") == (date(2028, 9, 2), date(2028, 9, 3))