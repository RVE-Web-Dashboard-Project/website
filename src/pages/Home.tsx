import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { CommandSelection } from "../components/Home/CommandSelection";
import { Console } from "../components/Home/Console/Console";
import { CoordinatorsSelection } from "../components/Home/CoordinatorsSelection";
import { NodesSelection } from "../components/Home/NodesSelection";

export default function Home() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
      Home
      </Typography>

      <Stack spacing={2} minHeight="100%" width="100%" useFlexGap>
        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 8 }} width="100%" paddingX="5%" useFlexGap>
          <CoordinatorsSelection />

          <NodesSelection />
        </Stack>

        <CommandSectionContainer>
          <CommandSelection />
          <Console />
        </CommandSectionContainer>
      </Stack>
    </Fragment>
  );
}

const CommandSectionContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  gap: theme.spacing(3),
  margin: "0 5% 3%",
  border: "1px solid",
  borderRadius: 35,
  borderColor: theme.palette.grey[500],
  padding: theme.spacing(2.5),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));