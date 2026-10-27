import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home } from "./Pages/Home/Home";
import { Park } from "./Pages/Park/Park";
import { WebLayout } from "./components/layout/webLayout";
import { AdminSignInLayout } from "./components/layout/adminSignInLayout";
import { AdminSignIn } from "./Pages/AdminSignIn/AdminSignIn";
import { AdminDashboard } from "./Pages/AdminDashboard/AdminDashboard";
import { RequireAdmin } from "./Pages/AdminDashboard/RequireAdmin";
import { AdminParks } from "./Pages/AdminParks/AdminParks";
import { AdminSpecificPark } from "./Pages/AdminSpecificPark/AdminSpecificPark";
import { AdminEvents } from "./Pages/AdminEvents/AdminEvents";
import { ParkSignIn } from "./Pages/ParksSignIn/ParksSignIn";
import { ParkAdminDashboard } from "./Pages/ParkAdmin/ParkAdminDashboard";
import { RequireParkAdmin } from "./Pages/ParkAdmin/RequireParkAdmin";
import { ConfirmHotelBooking } from "./Pages/SuccessHotelBooking/ConfirmHotelBooked";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/", 
                    element: <WebLayout />,
                    children: [
                        {
                            path: "/",
                            element: <Home />
                        },
                        {
                            path: "/parks/:slug/:id",
                            element: <Park />
                        },
                        {
                            path: "/successfulhotelbooking",
                            element: <ConfirmHotelBooking />
                        }
                    ]
                },

                {
                    path: "/adminsignin",
                    element: <AdminSignInLayout />,
                    children: [
                        {
                            path: "/adminsignin",
                            element: <AdminSignIn />
                        }
                    ]
                },

                {
                    path: "/parkadminsignin",
                    element: <AdminSignInLayout />,
                    children: [
                        {
                            path: "/parkadminsignin",
                            element: <ParkSignIn />
                        }
                    ]
                },


                {
                    element: <RequireAdmin />,
                    children: [
                        {
                            path: "/admindashboard",
                            element: <AdminDashboard />
                        },

                        {
                            path: "/adminparks",
                            element: <AdminParks />
                        },

                        {
                            path: "/adminparks/:slug/:id",
                            element: <AdminSpecificPark />
                        },

                        {
                            path: "/adminevents",
                            element: <AdminEvents />
                        }
                    ]
                },

                {
                    element: <RequireParkAdmin />,
                    children: [
                        {
                            element: <ParkAdminDashboard />,
                            path: "/dashboard/:slug/:id"
                        }
                    ]
                }
            ]
        }
    ]
)