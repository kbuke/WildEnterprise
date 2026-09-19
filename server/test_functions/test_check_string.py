import pytest

from functions.check_string import check_string

class TestCheckString():
    def test_error_none_value(self):
        with pytest.raises(ValueError):
            assert check_string(None)

    def test_error_boolean_value(self):
        with pytest.raises(ValueError):
            assert check_string(True)
            assert check_string(False)

    def test_no_empty_string(self):
        with pytest.raises(ValueError):
            assert check_string("")
            assert check_string("               ")

    def test_convert_to_string(self):
        assert check_string(2) == "2"

    def test_string_accepted(self):
        assert check_string("test") == "test"

    