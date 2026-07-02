import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { HomePg } from "./Pages/HomePg/HomePg";
import { SpecificSites } from "./Pages/SpecificSites/SpecificSites.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <HomePg />},
            {path: "sites/:slug/:id", element: <SpecificSites />}
        ]
    }
])
