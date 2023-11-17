import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetOrFetchInvitation } from "../../repository/commands/useGetOrFetchInvitation";
import { InvitationPageRouteParams } from "../../router/routes/authenticationRoutes";
import { InvitationPageForm } from "./InvitationPageForm";
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

  function acceptInvitation() {
    setAcceptedInvitation(true);
  }

  function createAccount(password: string) {
    console.debug("accepted invitation with password", password);
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error || invitation === undefined) {
    return (
      <InvalidCodeError errorCode={error ?? 404} />
    );
  }

  if (!acceptedInvitation) {
    return <InvitationPageExplanation invitation={invitation} acceptInvitation={acceptInvitation} />;
  }

  return (
    <InvitationPageForm invitation={invitation} createAccount={createAccount} />
  );
}

function InvalidCodeError({ errorCode }: {errorCode?: number}) {
  const txt = errorCode === 503 ? "Unable to reach server" : "Invalid invitation link";

  return (
    <Stack useFlexGap spacing={2}>
      <Typography variant="h6" color="error">{txt}</Typography>
      <Button component={Link} variant="contained" to="/login">Back to login page</Button>
    </Stack>
  );
}