import { Stack, styled, Typography } from "@mui/material";
import { Fragment } from "react";

export default function ManageCoordinators() {
  return (
    <Fragment>
      <Typography my={2} variant="h4" noWrap>
        Manage Coordinators
      </Typography>

      <ListContainer>

      </ListContainer>
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