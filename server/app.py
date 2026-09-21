from config import api, app

from resources.Parks import AllParks, SpecificPark
from resources.ParkImg import AllParkImages, SpecificParkImg
from resources.Events import AllEvents, SpecificEvent
from resources.Activities.Activities import AllActivities, SpecificActivity
from resources.Activities.Walks import AllWalks, SpecificWalk
from resources.Logins.AdminLogin import AdminLogin, AdminCheckSession, AdminLogout

api.add_resource(AllParks, "/parks")
api.add_resource(SpecificPark, "/parks/<int:id>")

api.add_resource(AllParkImages, "/parkimg")
api.add_resource(SpecificParkImg, "/parkimg/<int:id>")

api.add_resource(AllEvents, "/events")
api.add_resource(SpecificEvent, "/events/<int:id>")

api.add_resource(AllActivities, "/activities")
api.add_resource(SpecificActivity, "/activities/<int:id>")
api.add_resource(AllWalks, "/activities/walks")
api.add_resource(SpecificWalk, "/activities/walks/<int:id>")

api.add_resource(AdminLogin, "/admin/login")
api.add_resource(AdminLogout, "/admin/logout")
api.add_resource(AdminCheckSession, "/admin/checksession")

if __name__ == "__main__":
    app.run(port=5555, debug=True)