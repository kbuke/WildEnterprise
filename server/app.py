from config import app, api

from resources.Sites import SitesList, SpecificSite

api.add_resource(SitesList, "/sites")
api.add_resource(SpecificSite, "/sites/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)