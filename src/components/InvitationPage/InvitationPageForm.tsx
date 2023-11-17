import { Button, FormControl, Stack, Typography } from "@mui/material";
import { useState } from "react";

import useCheckPasswordStrength, { PasswordChecksLabels } from "../../repository/commands/useCheckPasswordStrength";
import { InvitationInfo } from "../../repository/types/user";
import PasswordInput from "../common/PasswordInput";

interface InvitationPageFormProps {
  invitation: InvitationInfo;
  createAccount(password: string): void;
}

export function InvitationPageForm({ invitation, createAccount }: InvitationPageFormProps) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    if (password !== passwordConfirmation) {
      return;
    }
    e.preventDefault();
    createAccount(password);
  };

  const passwordMatch = password === passwordConfirmation;
  const showMismatchError = passwordConfirmation.length > 0 && !passwordMatch;
  const { isStrong, failedChecks } = useCheckPasswordStrength(password);
  const isButtonDisabled = !passwordMatch || !isStrong;

  const errorLabel = failedChecks.length > 0 ? PasswordChecksLabels[failedChecks[0].name] : undefined;

  return (
    <Stack useFlexGap spacing={3}>
      <Typography>
        You are creating an account with the <b>{invitation.username}</b> username.<br />
        Please enter your new account password:
      </Typography>

      <FormControl fullWidth sx={{ px: 2, gap: 2 }} >
        <PasswordInput
          id="password"
          label="Password *"
          value={password}
          onInput={ e => setPassword((e.target as HTMLTextAreaElement).value)}
          errorLabel={errorLabel}
          required
        />

        <PasswordInput
          id="password"
          label="Confirm password *"
          value={passwordConfirmation}
          onInput={ e => setPasswordConfirmation((e.target as HTMLTextAreaElement).value)}
          errorLabel={showMismatchError ? "Passwords do not match" : undefined}
          required
        />

        <Button variant="contained" type="submit" onClick={onSubmit} disabled={isButtonDisabled}>
          Create
        </Button>
      </FormControl>
    </Stack>
  );
}