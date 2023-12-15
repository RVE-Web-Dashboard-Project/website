import { Outlet, RouteObject } from "react-router-dom";

import ManageUsers from "../../pages/ManageUsers";
import AdminGuard from "../guards/AdminGuard";


export const adminRoutes: RouteObject[] = [
  {
    element: (
      <AdminGuard>
        <Outlet />
      </AdminGuard>
    ),
    children: [
      {
        path: "/admin/users",
        Component: () => <ManageUsers />,
      },
    ],
  },
];