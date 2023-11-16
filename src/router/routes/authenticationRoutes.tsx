import { Outlet, RouteObject } from "react-router-dom";

import InvitationPage from "../../pages/InvitationPage";
import LoginPage from "../../pages/LoginPage";
import UnAuthGuard from "../guards/UnAuthGuard";

export interface InvitationPageRouteParams extends Record<string, string | undefined> {
  id: string;
}

export const authenticationRoutes: RouteObject[] = [
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
      {
        path: "/invitation/:id",
        Component: () => <InvitationPage />,
      },
    ],
  },
];