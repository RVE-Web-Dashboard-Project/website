import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

import { UsersList } from "../components/ManageUsers/UsersList";

export default function ManageUsers() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
      Manage Users
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 8 }} px="5%" width="100%" useFlexGap>
        <ListContainer>
          <UsersList />
        </ListContainer>
        <ListContainer>
          <UsersList />
        </ListContainer>
      </Stack>
    </Fragment>
  );
}

const ListContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  gap: theme.spacing(3),
  border: "1px solid",
  borderRadius: 35,
  borderColor: theme.palette.grey[500],
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
