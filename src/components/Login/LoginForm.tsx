import { Alert, Button, FormControl, styled, TextField, Typography } from "@mui/material";
import { Fragment, useMemo, useState } from "react";

import { useLogin } from "../../repository/api/useLogin";
import { WebsiteName } from "../../styles/theme";
import PasswordInput from "../common/PasswordInput";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginCommand, error, loading, data } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginCommand(username, password);
  };

  const errorMessage = useMemo(() => {
    if (error === null) {
      return null;
    } else if (error === 400) {
      return "Invalid username or password";
    } else {
      console.error(`Something went wrong while logging in: HTTP code ${error}`);
      return "Something went wrong while logging in";
    }
  }
  , [error]);

  console.log(`data: ${data}, error: ${error}, loading: ${loading}`);

  const isButtonDisabled = loading || !username.trim() || !password.trim();

  return (
    <Fragment>
      <FormTitle variant="h4" noWrap>
        {WebsiteName}
      </FormTitle>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <FormControl fullWidth sx={{ px: 2 }} >
        <TextField
          id="username"
          label="Username"
          value={username}
          onInput={ e => setUsername((e.target as HTMLTextAreaElement).value)}
          variant="outlined"
          sx={{ my: 2 }}
          disabled={loading}
          required
        />
        <PasswordInput
          id="password"
          label="Password *"
          value={password}
          onInput={ e => setPassword((e.target as HTMLTextAreaElement).value)}
          disabled={loading}
          required
        />

        <Button variant="contained" type="submit" sx={{ mt: 3 }} onClick={onSubmit} disabled={isButtonDisabled}>
            Login
        </Button>
      </FormControl>
    </Fragment>
  );
}

const FormTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(1),
  },
}));