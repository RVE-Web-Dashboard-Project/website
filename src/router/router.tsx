import { createBrowserRouter } from "react-router-dom";

import GeneralLayout from "../pages/layouts/GeneralLayout";
import { adminRoutes } from "./routes/adminRoutes";
import { authenticationRoutes } from "./routes/authenticationRoutes";
import { userRoutes } from "./routes/userRoutes";

const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      ...userRoutes,
      ...adminRoutes,
    ],
  },
  {
    children: [
      ...authenticationRoutes,
    ],
  },
]);

export default router;