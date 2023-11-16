import { createBrowserRouter } from "react-router-dom";

import GeneralLayout from "../pages/layouts/GeneralLayout";
import { authenticationRoutes } from "./routes/authenticationRoutes";
import { userRoutes } from "./routes/userRoutes";

const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      ...userRoutes,
    ],
  },
  {
    children: [
      ...authenticationRoutes,
    ],
  },
]);

export default router;