from config import api, app

from resources.Parks import AllParks, SpecificPark
from resources.ParkImg import AllParkImages, SpecificParkImg
from resources.Events import AllEvents, SpecificEvent
from resources.Activities.Activities import AllActivities, SpecificActivity
from resources.Activities.Walks import AllWalks, SpecificWalk
from resources.Logins.AdminLogin import AdminLogin, AdminCheckSession, AdminLogout
from resources.Hotels.Hotels import AllHotels, SpecificHotel
from resources.Logins.HotelLogin import HotelLogin, HotelLogout, HotelCheckSession
from resources.Hotels.Rooms import AllRooms, SpecificRoom
from resources.Hotels.RoomRates import AllRoomRates, SpecificRoomRate
from resources.Hotels.Discounts import AllDiscounts, SpecificDiscount
from resources.Hotels.LeadTimeRules import AllLeadTimeRules, SpecificLeadTimeRule
from resources.Hotels.RoomBookings import AllRoomBookings, SpecificRoomBooking
from resources.Hotels.RoomHold import CreateHold
from resources.Hotels.Availability import SearchAvailability
from resources.Hotels.Bookings import AllBookings, SpecificBooking
from resources.Activities.ActivityBooking import AllActivityBookings

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
api.add_resource(AllActivityBookings, "/activities/bookings")

api.add_resource(AdminLogin, "/admin/login")
api.add_resource(AdminLogout, "/admin/logout")
api.add_resource(AdminCheckSession, "/admin/checksession")

api.add_resource(HotelLogin, "/hotels/login")
api.add_resource(HotelLogout, "/hotels/logout")
api.add_resource(HotelCheckSession, "/hotels/checksession")

api.add_resource(AllHotels, "/hotels")
api.add_resource(SpecificHotel, "/hotels/<int:id>")
api.add_resource(AllRooms, "/hotels/rooms")
api.add_resource(SpecificRoom, "/hotels/rooms/<int:id>")
api.add_resource(AllRoomRates, "/hotels/roomrates")
api.add_resource(SpecificRoomRate, "/hotels/roomrates/<int:id>")
api.add_resource(AllDiscounts, "/hotels/discounts")
api.add_resource(SpecificDiscount, "/hotels/discounts/<int:id>")
api.add_resource(AllLeadTimeRules, "/hotels/leadtimes")
api.add_resource(SpecificLeadTimeRule, "/hotels/leadtimes/<int:id>")
api.add_resource(AllRoomBookings, "/hotels/roombookings")
api.add_resource(SpecificRoomBooking, "/hotels/roombookings/<int:id>")
api.add_resource(CreateHold, "/hotels/holds")
api.add_resource(SearchAvailability, "/hotels/availability")
api.add_resource(AllBookings, "/hotels/bookings")
api.add_resource(SpecificBooking, "/hotels/bookings/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)