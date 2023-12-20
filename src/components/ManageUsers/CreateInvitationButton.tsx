import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FormEvent, Fragment, useState } from "react";

export const CreateInvitationButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog(value: string | null) {
    setIsDialogOpen(false);
    console.log("Dialog closed with value", value);
  }

  return (
    <Fragment>
      <Button variant="outlined" size="small" color="secondary" onClick={handleOpenDialog}>New invitation</Button>
      <CreateInvitationDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </Fragment>
  );
};


interface CreateInvitationDialogProps {
  open: boolean;
  onClose: (value: string | null) => void;
}
const CreateInvitationDialog = ({ open, onClose }: CreateInvitationDialogProps) => {
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCancel} color="gray">Cancel</Button>
        <Button type="submit" form="new-invitation-form" color="secondary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};