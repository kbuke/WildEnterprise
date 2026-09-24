from resources.Hotels.BaseHotel import BaseHotel

from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel

class BaseWildEnterpriseHotel(BaseHotel):
    model = WEHotelModel

    field_map = {
        **BaseHotel.field_map,
    }

class AllWildEnterpriseHotels(BaseWildEnterpriseHotel):
    def get(self):
        return self.get_all()

    def post(self):
        return self,self.post_instance()

class SpecificWildEnterpriseHotel(BaseWildEnterpriseHotel):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)