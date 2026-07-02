from resources.BaseResource import BaseResource
from models.SiteModel import SiteModel

# Handle logic for all sites
class SitesList(BaseResource):
    model = SiteModel

    field_map = {
        "ame": "name",
        "location": "siteLocation",
        "intro": "siteIntro",
        "headImg": "head_img",
        "info": "info",
        "primaryImg1": "primary_img_1",
        "primaryImg2": "primary_img_2",
        "primaryImg3": "primary_img_3"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

# Handle Logic for Specific Site
class SpecificSite(BaseResource):
    model = SiteModel

    field_map = {
        "ame": "name",
        "location": "siteLocation",
        "intro": "siteIntro",
        "headImg": "head_img",
        "info": "info",
        "primaryImg1": "primary_img_1",
        "primaryImg2": "primary_img_2",
        "primaryImg3": "primary_img_3"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)