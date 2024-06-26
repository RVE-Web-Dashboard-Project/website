import { Stack, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Appbar from "../../components/common/Appbar";


export default function GeneralLayout() {
  return (
    <Stack height="100%" alignItems="center">
      <Appbar />
      <Toolbar />
      <Outlet />
    </Stack>
  );
}