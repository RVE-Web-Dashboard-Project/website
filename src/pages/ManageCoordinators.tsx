import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { CoordinatorsList } from "../components/ManageCoordinators/CoordinatorsList";

export default function ManageCoordinators() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
        Manage Coordinators
      </Typography>

      <ListContainer>
        <CoordinatorsList />
      </ListContainer>
    </Fragment>
  );
}

const ListContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  gap: theme.spacing(3),
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));