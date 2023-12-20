import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FormEvent, Fragment, useEffect, useState } from "react";

import { useCreateInvitation } from "../../repository/api/useCreateInvitation";

export const CreateInvitationButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(null);
  const { createInvitation, loading, error, success } = useCreateInvitation();

  if (error) {
    console.error("Error while creating invitation:", error);
  } else if (success && isDialogOpen) {
    setIsDialogOpen(false);
  }

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog(value: string | null) {
    console.log("Dialog closed with value", value);
    if (value === null || loading) {
      setIsDialogOpen(false);
      return;
    }
    createInvitation(value);
  }

  useEffect(() => {
    if (error === 400) {
      setDialogErrorMessage("Username is already taken.");
    } else if (error) {
      setDialogErrorMessage("An unknown error occurred.");
    } else {
      setDialogErrorMessage(null);
    }
  }, [error]);

  return (
    <Fragment>
      <Button variant="outlined" size="small" color="secondary" onClick={handleOpenDialog} disabled={loading}>New invitation</Button>
      <CreateInvitationDialog open={isDialogOpen} onClose={handleCloseDialog} errorMessage={dialogErrorMessage || undefined} />
    </Fragment>
  );
};


interface CreateInvitationDialogProps {
  open: boolean;
  onClose: (value: string | null) => void;
  errorMessage?: string;
}
const CreateInvitationDialog = ({ open, onClose, errorMessage }: CreateInvitationDialogProps) => {
  const [username, setUsername] = useState("");

  const isUsernameValid = /^\w{3,16}$/.test(username);

  function handleSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isUsernameValid) return;
    setUsername("");
    onClose(username);
  }

  function handelCancel() {
    onClose(null);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Create invitation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Invite someone to create an account on this platform by sending them an invitation link.
          The username entered must be used to log in, and cannot be changed.
        </DialogContentText>
        <form id="new-invitation-form" onSubmit={handleSubmission}>
          <TextField
            autoFocus
            id="username"
            label="Username"
            margin="dense"
            type="text"
            variant="standard"
            color={isUsernameValid ? "secondary" : "error"}
            helperText={isUsernameValid ? "" : "Username must be 3-16 characters long and contain only letters, numbers and underscores."}
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            inputProps={{
              pattern: "\\w{3,16}",
              minLength: 3,
              maxLength: 16,
            }}
            fullWidth
            required
          />
        </form>
        {errorMessage && <DialogContentText color="error">{errorMessage}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCancel} color="gray">Cancel</Button>
        <Button type="submit" form="new-invitation-form" color="secondary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};