from models.ProjectModel import ProjectModel
from models.ArticleModel import ArticleModel

from resources.BaseDraftResource import BaseDraftResource

from decorators.require_admin_login import require_admin_login

from schemas.project import ProjectSchema, ProjectDetailSchema


class BaseProject(BaseDraftResource):
    model = ProjectModel

    schema = ProjectSchema

    detail_schema = ProjectDetailSchema

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "cardInfo": "card_info",
        "pI1": "primary_img_1",
        "pI2": "primary_img_2",
        "pI3": "primary_img_3",
        "pI4": "primary_img_4",
        "pI5": "primary_img_5"
    }

    relations = {
        "articleIds": ("articles", ArticleModel)
    }

    always_required = ("name",)


# ---------------- Public: published projects only ----------------
class AllProjects(BaseProject):
    def get(self):
        return self.get_published()


class SpecificProject(BaseProject):
    def get(self, id):
        return self.get_published_specific(id)


# ---------------- Admin: everything, including drafts ----------------
class AdminProjects(BaseProject):
    @require_admin_login
    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_draft()


class AdminSpecificProject(BaseProject):
    @require_admin_login
    def get(self, id):
        return self.get_specific(id)

    @require_admin_login
    def patch(self, id):
        return self.patch_draft(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)