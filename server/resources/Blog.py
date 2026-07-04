from resources.BaseResource import BaseResource
from models.BlogModel import BlogModel

class BlogList(BaseResource):
    model = BlogModel

    field_map = {
        "title": "title",
        "coverPhoto": "cover_photo",
        "views": "views",
        "content": "content",
        "status": "status"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificBlog(BaseResource):
    model = BlogModel

    field_map = {
        "title": "title",
        "coverPhoto": "cover_photo",
        "views": "views",
        "content": "content",
        "status": "status"
    }

    increment_on_view = "views"

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)