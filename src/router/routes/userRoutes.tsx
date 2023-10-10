import { Outlet, RouteObject } from "react-router-dom";

import Home from "../../pages/Home";
import AuthGuard from "../guards/AuthGuard";


export const userRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        Component: () => <Home />,
      },
    ],
  },
];