import pytest 

from functions.check_not_bool_or_none import check_not_bool_or_none

class TestCheckNotBoolOrNone():
    def test_value_bool_fail(self):
        with pytest.raises(ValueError):
            assert check_not_bool_or_none(True)
            assert check_not_bool_or_none(False)

    def test_value_none_fail(self):
        assert check_not_bool_or_none("Test") == "Test"