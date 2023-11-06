import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { CommandSelection } from "../components/Home/CommandSelection";
import { CoordinatorsSelection } from "../components/Home/CoordinatorsSelection";
import { NodesSelection } from "../components/Home/NodesSelection";

export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
      Home
      </Typography>

      <Stack spacing={2} minHeight="100%" width="100%" useFlexGap>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} width="100%" paddingX="5%" useFlexGap>
          <CoordinatorsSelection />

          <NodesSelection />
        </Stack>

        <CommandSectionContainer>
          <CommandSelection />
        </CommandSectionContainer>
      </Stack>
    </Fragment>
  );
}

const CommandSectionContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  margin: "0 5% 3%",
  border: "1px solid",
  borderRadius: 35,
  borderColor: theme.palette.grey[500],
  padding: theme.spacing(2.5),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));