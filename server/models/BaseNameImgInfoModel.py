from sqlalchemy_serializer import SerializerMixin
from config import db 

class BaseNameImgInfomodel(db.Model, SerializerMixin):
    __abstract__ = True
    
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False)