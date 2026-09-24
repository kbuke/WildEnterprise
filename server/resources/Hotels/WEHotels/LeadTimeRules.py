from resources.BaseResource import BaseResource

from decorators.require_hotel_login import require_hotel_login

from hotel_booking_functions.check_hotel_owner import post_hotel_info, patch_delete_hotel_info

from models.HotelModels.WildEnterpriseHotels.LeadTimeModel import LeadTimeRuleModel

class BaseLeadTimeRule(BaseResource):
    model = LeadTimeRuleModel

    field_map = {
        "minDays": "min_days",
        "maxDays": "max_days",
        "multiplier": "multiplier",
        "label": "label",
        "hotelId": "hotel_id",
        "roomId": "room_id"
    }

class AllLeadTimeRules(BaseLeadTimeRule):
    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        result = post_hotel_info()

        if result:
            return result
        
        return self.post_instance()

class SpecificLeadTimeRule(BaseLeadTimeRule):
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        result = patch_delete_hotel_info(LeadTimeRuleModel, id)
        if result:
            return result
        
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        result = patch_delete_hotel_info(LeadTimeRuleModel, id)
        if result:
            return result
        
        return self.delete_instance(id) 