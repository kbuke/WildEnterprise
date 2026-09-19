import pytest 

from functions.check_unique import check_unique

from models.ParkModels import ParkModel

from config import db

from unittest.mock import Mock

class TestCheckUnique():
    def test_value_exists(self):
        model = Mock()

        model.query.filter.return_value.first.return_value = True # pretend the database query found an existing record

        with pytest.raises(AttributeError):
            assert check_unique(
                model,
                "name",
                "Test Park"
            )

            assert check_unique(
                model,
                "name",
                "Tes t Park"
            )

            assert check_unique(
                model,
                "name",
                "testPark"
            )

    def test_value_not_exists(self):
        model = Mock()

        model.query.filter.return_value.first.return_value = False

        assert check_unique(
            model,
            "name",
            "Test Park"
        ) == "Test Park"
        