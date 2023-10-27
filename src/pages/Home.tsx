import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import { CoordinatorsSelection } from "../components/Home/CoordinatorsSelection";
import { NodesSelection } from "../components/Home/NodesSelection";

export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
      Home
      </Typography>

      <Stack direction="row" spacing={2}>
        <CoordinatorsSelection />

        <NodesSelection />
      </Stack>
    </Fragment>
  );
}