import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetOrFetchInvitation } from "../../repository/commands/useGetOrFetchInvitation";
import { InvitationPageRouteParams } from "../../router/routes/authenticationRoutes";
import { InvitationPageExplanation } from "./InvitationPageIntroduction";

export function InvitationPageContent() {
  const params = useParams<InvitationPageRouteParams>();

  if (params.id === undefined) {
    return (
      <InvalidCodeError />
    );
  }

  return <InternalInvitationPageContent invitationId={params.id} />;
}

function InternalInvitationPageContent({ invitationId }: { invitationId: string }) {
  const [acceptedInvitation, setAcceptedInvitation] = useState(false);
  const { invitation, error, loading } = useGetOrFetchInvitation(invitationId);

  const acceptInvitation = () => {
    setAcceptedInvitation(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <InvalidCodeError />
    );
  }

  if (!acceptedInvitation) {
    return <InvitationPageExplanation acceptInvitation={acceptInvitation} />;
  }

  return (
    <Fragment>
      <span>{invitation?.inviter}</span>
    </Fragment>
  );
}

function InvalidCodeError() {
  return (
    <Stack useFlexGap spacing={2}>
      <Typography variant="h6" color="error">Invalid invitation link</Typography>
      <Button component={Link} variant="contained" to="/login">Back to login page</Button>
    </Stack>
  );
}