# The Walking Trails in Karkloof are strange. As they will also be advertising 


from models.ActivityModels.BaseActivityModel import BaseActivityModel

from config import db 

from sqlalchemy.orm import validates

class WalkingTrailModel(BaseActivityModel):
    table_name = "walking_trails"

    id = db.Column(db.Integer, db.ForeignKey("activities.id"), primary_key = True)
    map = db.Column(db.String, nullable = False)
    code_of_conduct = db.Column(db.String, nullable = False)