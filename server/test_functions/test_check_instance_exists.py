import pytest

from functions.check_instance_exists import check_instance_exists

from models.HotelModels.HotelModel import HotelModel

from app import app

class TestCheckInstanceExists():
    def test_check_instance_not_exist(self):
        with app.app_context():
            with pytest.raises(AttributeError):
                assert check_instance_exists(HotelModel, 999)