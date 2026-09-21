from resources.BaseResource import BaseResource

from models.ActivityModels.BaseActivityModel import BaseActivityModel

class BaseActivities(BaseResource):
    model = BaseActivityModel

    field_map = {
        "allYearRound": "all_year_round",
        "availableMonths": "available_months",
        "freeWithStay": "free_with_stay",
        "discountWithStay": "discount_with_stay",
        "stayDiscount": "stay_discount",
        "price": "price",
        "parkId": "park_id"
    }

class AllActivities(BaseActivities):
    def get(self):
        return self.get_all()

    def post(self):
        return self.post_instance()

class SpecificActivity(BaseActivities):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)