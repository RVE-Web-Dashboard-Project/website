import { Typography } from "@mui/material";
import { Fragment } from "react";

import { CoordinatorsSelection } from "../components/Home/CoordinatorsSelection";

export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
      Home
      </Typography>

      <CoordinatorsSelection />
    </Fragment>
  );
}