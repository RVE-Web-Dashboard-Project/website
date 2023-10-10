import { RouteObject } from "react-router-dom";

import Home from "../../pages/Home";


export const generalRoutes: RouteObject[] = [
  {
    path: "/",
    Component: () => <Home />,
  },
];