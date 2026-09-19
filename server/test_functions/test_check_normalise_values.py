from functions.check_normalise_values import check_normalise_values

class TestCheckNormaliseValues():
    def test_lowercase(self):
        assert check_normalise_values("TEST") == "test"

    def test_rm_spaces(self):
        assert check_normalise_values("t e s t") == "test"

    def test_lowercase_and_rm_space(self):
        assert check_normalise_values("T E S T") == "test"

    def test_already_normalised(self):
        assert check_normalise_values("test") == "test"