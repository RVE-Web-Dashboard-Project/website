import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { CoordinatorsList } from "../components/ManageCoordinators/CoordinatorsList";
import { DownloadCoordinatorsButton } from "../components/ManageCoordinators/DownloadCoordinatorsButton";
import { EditCoordinatorsButton } from "../components/ManageCoordinators/EditCoordinatorsButton";

export default function ManageCoordinators() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
        Manage Coordinators
      </Typography>

      <ButtonsContainer >
        <DownloadCoordinatorsButton />
        <EditCoordinatorsButton />
      </ButtonsContainer>

      <ListContainer>
        <CoordinatorsList />
      </ListContainer>
    </Fragment>
  );
}

const ButtonsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: `${theme.spacing(1)} ${theme.spacing(2)}`,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  flexWrap: "wrap",
  justifyContent: "center",
}));

const ListContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  gap: theme.spacing(3),
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));