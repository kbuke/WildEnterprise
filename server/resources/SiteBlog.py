from resources.BaseResource import BaseResource
from models.SiteBlogModel import SiteBlogModel

class SiteBlogList(BaseResource):
    model = SiteBlogModel

    field_map = {
        "siteId": "site_id",
        "blogId": "blog_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificSiteBlog(BaseResource):
    model = SiteBlogModel

    field_map = {
        "siteId": "site_id",
        "blogId": "blog_id"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)