import pytest

from functions.check_valid_value import check_valid_value

class TestCheckValidValue():
    def test_not_valid(self):
        with pytest.raises(ValueError):
            assert check_valid_value(
                ["Test", "testing"],
                "hello"
            )

    def test_valid(self):
        assert check_valid_value(
            ["Test", "Tester"], 
            "Test"
        ) == "Test"