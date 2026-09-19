import pytest 

from functions.check_int import check_int

class TestCheckInt():
    def test_not_bool(self):
        with pytest.raises(ValueError):
            assert check_int(True)
            assert check_int(False)

    def test_not_none(self):
        with pytest.raises(ValueError):
            assert check_int(None)

    def test_not_int(self):
        with pytest.raises(ValueError):
            assert check_int("Test")
            assert check_int(72.5)

    def test_int(self):
        assert check_int(50) == 50