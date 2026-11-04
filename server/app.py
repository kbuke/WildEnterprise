from config import api, app

from resources.Parks import AllParks, SpecificPark
from resources.ParkImg import AllParkImages, SpecificParkImg
from resources.Events.Events import AllEvents, SpecificEvent
from resources.Activities.Activities import AllActivities, SpecificActivity
from resources.Activities.Walks import AllWalks, SpecificWalk
from resources.Logins.AdminLogin import AdminLogin, AdminCheckSession, AdminLogout
from resources.Hotels.WEHotels.Rooms import AllRooms, SpecificRoom
from resources.Hotels.WEHotels.RoomRates import AllRoomRates, SpecificRoomRate
from resources.Hotels.WEHotels.Discounts import AllDiscounts, SpecificDiscount
from resources.Hotels.WEHotels.LeadTimeRules import AllLeadTimeRules, SpecificLeadTimeRule
from resources.Hotels.WEHotels.RoomBookings import AllRoomBookings, SpecificRoomBooking
from resources.Hotels.WEHotels.RoomHold import CreateHold
from resources.Hotels.WEHotels.Availability import SearchAvailability
from resources.Hotels.WEHotels.Bookings import AllBookings, SpecificBooking
from resources.Activities.ActivityBooking import AllActivityBookings
from resources.Hotels.PartnerHotels.PartnerHotels import ChangePartnerHotelCredentials, AllPartnerHotels, SpecificPartnerHotel
from resources.Logins.PartnerHotelLogin import PartnerHotelLogin, PartnerHotelLogout, PartnerHotelCheckSession
from resources.Hotels.PartnerHotels.PartnerHotelBookings import AllPartnerHotelBookings
from resources.Logins.ParkLogin import ParkLogin, ParkLogout, ParkCheckSession
from resources.Hotels.WEHotels.Reviews import AllReviews, VerifyReviewBooking
from resources.Hotels.WEHotels.StayVerify import VerifyStay
from resources.Articles import AllArticles, SpecificArticle, AdminArticles, AdminSpecificArticle
from resources.Projects import AllProjects, SpecificProject, AdminProjects, AdminSpecificProject
from resources.Events.EventBooking import AllEventBookings, PostEventBooking, LookupEventBooking, CancelEventBooking
from resources.Events.EventTicket import CheckInTicket, AllEventTickets, SpecificEventTicket

api.add_resource(AllParks, "/parks")
api.add_resource(SpecificPark, "/parks/<int:id>")

api.add_resource(ParkLogin, "/parks/login")
api.add_resource(ParkCheckSession, "/parks/checksession")
api.add_resource(ParkLogout, "/parks/logout")

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

api.add_resource(PartnerHotelLogin, "/hotels/partner/login")
api.add_resource(PartnerHotelLogout, "/hotels/partner/logout")
api.add_resource(PartnerHotelCheckSession, "/hotels/partner/checksession")
api.add_resource(ChangePartnerHotelCredentials, "/hotels/partner/changecredentials/<int:id>")

api.add_resource(AllPartnerHotels, "/hotels/partner")

api.add_resource(AllPartnerHotelBookings, "/hotels/partner/bookings")

api.add_resource(AllRooms, "/rooms")
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

api.add_resource(AllReviews, "/reviews")
api.add_resource(VerifyReviewBooking, "/reviews/verify")

api.add_resource(VerifyStay, "/hotels/bookings/verify")

api.add_resource(AllArticles, "/articles")
api.add_resource(SpecificArticle, "/articles/<int:id>")
api.add_resource(AdminArticles, "/admin/articles")
api.add_resource(AdminSpecificArticle, "/admin/articles/<int:id>")

api.add_resource(AllProjects, "/projects")
api.add_resource(SpecificProject, "/projects/<int:id>")
api.add_resource(AdminProjects, "/admin/projects")
api.add_resource(AdminSpecificProject, "/admin/projects/<int:id>")

api.add_resource(AllEventBookings, "/eventbookings")
api.add_resource(PostEventBooking, "/eventbookings/create")
api.add_resource(LookupEventBooking, "/eventbookings/lookup")
api.add_resource(CancelEventBooking, "/eventbookings/cancel")

api.add_resource(AllEventTickets, "/eventtickets")
api.add_resource(SpecificEventTicket, "/eventtickets/<int:id>")
api.add_resource(CheckInTicket, "/eventtickets/checkin")

if __name__ == "__main__":
    app.run(port=5555, debug=True)