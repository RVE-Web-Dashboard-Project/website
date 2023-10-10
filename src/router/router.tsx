import { createBrowserRouter } from "react-router-dom";

import GeneralLayout from "../pages/layouts/GeneralLayout";
import { loginRoute } from "./routes/loginRoute";
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
      ...loginRoute,
    ],
  },
]);

export default router;