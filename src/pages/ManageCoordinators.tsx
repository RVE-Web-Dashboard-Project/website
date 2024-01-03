import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { CoordinatorsList } from "../components/ManageCoordinators/CoordinatorsList";
import { DownloadCoordinatorsButton } from "../components/ManageCoordinators/DownloadCoordinatorsButton";

export default function ManageCoordinators() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
        Manage Coordinators
      </Typography>

      <Stack direction="row" spacing={2}>
        <DownloadCoordinatorsButton />
      </Stack>

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