import { Outlet, RouteObject } from "react-router-dom";

import LoginPage from "../../pages/LoginPage";
import UnAuthGuard from "../guards/UnAuthGuard";


export const loginRoute: RouteObject[] = [
  {
    element: (
      <UnAuthGuard>
        <Outlet />
      </UnAuthGuard>
    ),
    children: [
      {
        path: "/login",
        Component: () => <LoginPage />,
      },
    ],
  },
];