import { Stack, styled, Toolbar, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import { CommandSelection } from "../components/Home/CommandSelection";
import { Console } from "../components/Home/Console/Console";
import { CoordinatorsSelection } from "../components/Home/CoordinatorsSelection";
import { NodesPingStatusDrawer, NodesPingStatusDrawerWidth } from "../components/Home/NodesPingStatus/NodesPingStatusDrawer";
import { NodesSelection } from "../components/Home/NodesSelection";
import { useIsOnMobile } from "../styles/useIsOnMobile";

export default function Home() {
  const isOnMobile = useIsOnMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Fragment >
      <Toolbar />
      <Main open={!isOnMobile && isDrawerOpen}>
        <Typography my={2} variant="h4" textAlign="center" noWrap>Home</Typography>


        <Stack spacing={2} minHeight="100%" width="100%" useFlexGap>
          <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 8 }} width="100%" paddingX="5%" useFlexGap>
            <CoordinatorsSelection />

            <NodesSelection isDrawerOpen={isDrawerOpen} onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
          </Stack>

          <CommandSectionContainer>
            <CommandSelection />
            <Console />
          </CommandSectionContainer>
        </Stack>
      </Main>

      <NodesPingStatusDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: 0,
  width: "100%",
  alignItems: "center",
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: NodesPingStatusDrawerWidth,
    width: `calc(100% - ${NodesPingStatusDrawerWidth}px)`,
  }),
  position: "relative",
}));