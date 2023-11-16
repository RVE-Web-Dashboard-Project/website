import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface InvitationPageContentProps {
  acceptInvitation: () => void;
}

export function InvitationPageExplanation({ acceptInvitation }: InvitationPageContentProps) {

  return (
    <Stack useFlexGap spacing={3}>
      <Typography variant="h6">
        You've been invited by <b>ADMIN ACCOUNT</b>
      </Typography>

      <Typography>
        By accepting this invitation, you will be able to access this platform through the <b>dummy</b> username and your own password.
      </Typography>

      <Stack useFlexGap spacing={1.5}>
        <Button variant="contained" onClick={acceptInvitation}>Accept</Button>
        <Button component={Link} variant="outlined" to="/login">I already have an account</Button>
      </Stack>
    </Stack>
  );
}