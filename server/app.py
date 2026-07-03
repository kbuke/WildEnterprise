from config import app, api

from resources.Sites import SitesList, SpecificSite
from resources.Animals import AnimalList, SpecificAnimal
from resources.SiteAnimals import SiteAnimalList, SpecificSiteAnimal

api.add_resource(SitesList, "/sites")
api.add_resource(SpecificSite, "/sites/<int:id>")

api.add_resource(AnimalList, "/animals")
api.add_resource(SpecificAnimal, "/animals/<int:id>")

api.add_resource(SiteAnimalList, "/siteanimals")
api.add_resource(SpecificSiteAnimal, "/siteanimals/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)