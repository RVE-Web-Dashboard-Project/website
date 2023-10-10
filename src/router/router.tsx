import { createBrowserRouter } from "react-router-dom";

import GeneralLayout from "../pages/layouts/GeneralLayout";
import { generalRoutes } from "./routes/generalRoutes";

const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      ...generalRoutes,
    ],
  },
]);

export default router;