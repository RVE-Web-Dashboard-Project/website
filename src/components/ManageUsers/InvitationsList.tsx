import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { CircularProgress, Divider, List, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import { useFetchInvitations } from "../../repository/api/useFetchInvitations";
import { InvitationListItem } from "./InvitationListItem";

export const InvitationList = () => {
  const { data: invitations, error, loading, fetchInvitationsCommand } = useFetchInvitations();

  if (!invitations && !loading && !error) {
    fetchInvitationsCommand();
  }

  const Content = () => {
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
    if (!invitations) {
      return <CircularProgress color="secondary" />;
    }
    const sortedInvitations = invitations.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return (
      <List >
        {sortedInvitations.map((invite, index) => (
          <Fragment key={invite.id}>
            {(index !== 0) && <Divider />}
            <InvitationListItem
              invite={invite}
            />
          </Fragment>
        ))}
      </List>
    );
  };

  return (
    <Stack flex={1}>
      <Typography variant="h5" noWrap sx={{ display: "flex", alignItems: "center" }}>
        <MailOutlineIcon sx={{ mr: 1 }} />
        Invitation list
      </Typography>

      <Content />
    </Stack>
  );
};