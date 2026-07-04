from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db 

from validators.validate_instance_exists import validate_instance_exists
from validators.validate_unique_pair import validate_unique_pair

from models.SiteModel import SiteModel
from models.BlogModel import BlogModel

class SiteBlogModel(db.Model, SerializerMixin):
    __tablename__ = "site_blogs"

    id = db.Column(db.Integer, primary_key = True)
    site_id = db.Column(db.ForeignKey("sites.id"))
    blog_id = db.Column(db.ForeignKey("blogs.id"))

    @validates("site_id")
    def validate_site(self, key, value):
        return validate_instance_exists(SiteModel, value, key)
    
    @validates("blog_id")
    def validate_blog(self, key, value):
        return validate_instance_exists(BlogModel, value, key)

    def validate_unique(self):
        validate_unique_pair(
            self,
            SiteBlogModel,
            site_id = self.site_id,
            blog_id = self.blog_id
        )    