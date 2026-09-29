from resources.BaseResource import BaseResource
from resources.Activities.Activities import BaseActivities

from models.ActivityModels.WalkingTrailModel import WalkingTrailModel

from schemas.activity_schemas.activity import WalkingTrailSchema, WalkingTrailDetailedSchema

class BaseWalks(BaseActivities):
    model = WalkingTrailModel

    schema = WalkingTrailSchema

    detail_schema = WalkingTrailDetailedSchema

    field_map = {
        **BaseActivities.field_map,
        "map": "map",
        "codeOfConduct": "code_of_conduct"
    }

class AllWalks(BaseWalks):
    def get(self):
        return self.get_all()

    def post(self):
        return self.post_instance()

class SpecificWalk(BaseWalks):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)