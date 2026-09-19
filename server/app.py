from config import api, app

from resources.Parks import AllParks, SpecificPark
from resources.ParkImg import AllParkImages, SpecificParkImg
from resources.Events import AllEvents, SpecificEvent

api.add_resource(AllParks, "/parks")
api.add_resource(SpecificPark, "/parks/<int:id>")

api.add_resource(AllParkImages, "/parkimg")
api.add_resource(SpecificParkImg, "/parkimg/<int:id>")

api.add_resource(AllEvents, "/events")
api.add_resource(SpecificEvent, "/events/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)