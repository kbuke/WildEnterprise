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
import { AdminArticles } from "./Pages/AdminArticles/AdminArticles";
import { SpecificArticle } from "./Pages/SpecificArticle.tsx/SpecificArticle";
import { AdminProjects } from "./Pages/AdminProjects/AdminProjects";
import { SpecificEvent } from "./Pages/SpecificEvent/SpecificEvent";
import { AdminSpecificEvent } from "./Pages/AdminEvents/AdminSpecificEvent";
import { ScannerSignIn } from "./Pages/ScannerSignIn/ScannerSignIn";
import { RequireScannerLogin } from "./Pages/EventScanner/RequireScannerLogin";
import { EventScannerDashboard } from "./Pages/EventScanner/EventScannerDashboard";
import { SpecificEventScanner } from "./Pages/EventScanner/SpecificEventScanner";

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
                        },
                        {
                            path: "/articles/:slug/:id",
                            element: <SpecificArticle />
                        },
                        {
                            path: "/events/:slug/:id",
                            element: <SpecificEvent />
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
                    path: "/scannersignin",
                    element: <AdminSignInLayout />,
                    children: [
                        {
                            path: "/scannersignin",
                            element: <ScannerSignIn />
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
                        },

                        {
                            path: "/adminevents/:slug/:id",
                            element: <AdminSpecificEvent />
                        },

                        {
                            path: "/adminarticles",
                            element: <AdminArticles />
                        },

                        {
                            path: "/adminprojects",
                            element: <AdminProjects />
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
                },

                {
                    element: <RequireScannerLogin />,
                    children: [
                        {
                            element: <EventScannerDashboard />,
                            path: "/scannerlogin"
                        },

                        {
                            element: <SpecificEventScanner />,
                            path: "/scanevent/:slug/:id"
                        }
                    ]
                }
            ]
        }
    ]
)