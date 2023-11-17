import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { InvitationInfo } from "../../repository/types/user";

interface InvitationPageContentProps {
  invitation: InvitationInfo;
  acceptInvitation: () => void;
}

export function InvitationPageExplanation({ invitation, acceptInvitation }: InvitationPageContentProps) {

  const invitationDate = new Date(invitation.createdAt);
  const localizedInvitationDate = invitationDate.toLocaleString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Stack useFlexGap spacing={3}>
      <Typography variant="h6">
        You've been invited by <b>{invitation.inviter}</b>
      </Typography>

      <Typography>
        By accepting this invitation, you will be able to access this platform through the <b>{invitation.username}</b> username and your own password.
      </Typography>

      <Typography variant="body2" sx={{ opacity: 0.6 }}>This invitation has been created on {localizedInvitationDate}</Typography>

      <Stack useFlexGap spacing={1.5}>
        <Button variant="contained" onClick={acceptInvitation}>Accept</Button>
        <Button component={Link} variant="outlined" to="/login">I already have an account</Button>
      </Stack>
    </Stack>
  );
}