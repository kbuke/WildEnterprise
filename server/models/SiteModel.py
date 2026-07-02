from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from validators.validate_slug import validate_slug

from config import db 

class SiteModel(db.Model, SerializerMixin):
    __tablename__ = "sites"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    slug = db.Column(db.String, nullable = False) # helps with SEO Optimization
    location = db.Column(db.String, nullable = False)
    intro = db.Column(db.String, nullable = False)
    head_img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False) # eventually use TipTap for a text-rich alt
    primary_img_1 = db.Column(db.String, nullable = False)
    primary_img_2 = db.Column(db.String, nullable = False)
    primary_img_3 = db.Column(db.String, nullable = False)

    # Need to link up with Site Images, to display several images for each site
    # Need to link up with Site Hotels (if they have any)
    # Need to link up with Site Activities (if they have any)
    # Need to link up with Blog Posts that mention each site
    # Need to show animals that live on land

    @validates("title")
    def validate_title_slug(self, key, value):
        self.slug = validate_slug(value) # make slug more SEO friendly
        return value
        

