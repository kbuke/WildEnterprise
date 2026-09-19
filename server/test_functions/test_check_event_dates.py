import pytest

from functions.check_event_dates import check_event_dates

from datetime import date, timedelta

class TestCheckEventDates():
    def test_start_date_none(self):
        with pytest.raises(ValueError):
            assert check_event_dates(None)

    def test_start_date_boolean(self):
        with pytest.raises(ValueError):
            assert check_event_dates(True)
            assert check_event_dates(False)

    def test_start_date_not_date(self):
        with pytest.raises(ValueError):
            assert check_event_dates("Test")
            assert check_event_dates(1)

    def test_start_date_convert(self):
        assert check_event_dates("2026-10-24") == (date(2026, 10, 24), None)

    def test_event_start_past(self):
        today = date.today()
        yesterday = today - timedelta(days=1)
        with pytest.raises(ValueError):
            assert check_event_dates(yesterday)

    def test_event_start_pass(self):
        today = date.today()
        tomorrow = today + timedelta(days=1)
        assert check_event_dates(today) == (today, None)
        assert check_event_dates(tomorrow) == (tomorrow, None)

    def test_end_date_bool(self):
        with pytest.raises(ValueError):
            assert check_event_dates(True)
            assert check_event_dates(False)

    def test_end_date_not_date(self):
        with pytest.raises(ValueError):
            assert check_event_dates("2026-10-24", "test")

    def test_end_date_converted(self):
        assert check_event_dates("2026-10-24", "2026-12-20") == (date(2026, 10, 24), date(2026, 12, 20))

    def test_end_date_before_start(self):
        with pytest.raises(ValueError):
            assert check_event_dates("2026-10-24", "2026-10-23")
    