import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../pages/layouts/PublicLayout";
import { publicRoutes } from "./routes/publicRoutes";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      ...publicRoutes,
    ],
  },
]);

export default router;