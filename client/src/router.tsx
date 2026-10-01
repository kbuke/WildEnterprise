import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { WeHotelAdminSignInPg } from "./Pages/WeHotelAdmin/WeHotelAdminSignIn/WeHotelAdminSignInPg";
import { ProtectedAdminRoute } from "./CustomComponents/ProtectedRoutes";
import { WeHotelAdminDashboard } from "./Pages/WeHotelAdmin/LoggedWeHotelAdmin/WeHotelAdminDashboard";
import { AppAdminSignInPg } from "./Pages/AppAdmin/AppAdminSignIn/AppAdminSignIn";
import { AppAdminDashboard } from "./Pages/AppAdmin/LoggedAppAdmin/AppAdminDashboard";
import { AppAdminHotels } from "./Pages/AppAdmin/LoggedAppAdmin/AppAdminHotels/AppAdminHotels";
import { AppAdminAllParks } from "./Pages/AppAdmin/LoggedAppAdmin/AppAdminParks/AppAdminAllParks";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children:[
                {path: "/hoteladminlogin", element: <WeHotelAdminSignInPg />},
                {path: "/adminlogin", element: <AppAdminSignInPg />},

                {
                    element: <ProtectedAdminRoute 
                        type="Hotel"
                    />,
                    children: [
                        {
                            path: "/:slug/admin/dashboard",
                            element: <WeHotelAdminDashboard />
                        }
                    ]
                },

                {
                    element: <ProtectedAdminRoute 
                        type="Admin"
                    />,
                    children: [
                        {
                            path: "/admin/dashboard",
                            element: <AppAdminDashboard />
                        },
                        {
                            path: "admin/hotels",
                            element: <AppAdminHotels />
                        },
                        {
                            path: "admin/parks",
                            element: <AppAdminAllParks />
                        }
                    ]
                }
            ]
        }
    ]
)