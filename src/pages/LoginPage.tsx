import { Button, FormControl, GlobalStyles, Paper, styled, TextField, Typography, useTheme } from "@mui/material";
import { Fragment } from "react";

import PasswordInput from "../components/common/PasswordInput";

export default function LoginPage() {
  const theme = useTheme();

  return (
    <Fragment>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.primary.dark },
        }}
      />
      <FormBackground elevation={2}>
        <FormTitle variant="h4" noWrap>
          Login
        </FormTitle>
        <FormControl fullWidth sx={{ px: 2 }} >
          <TextField id="username" label="Username" variant="outlined" sx={{ my: 2 }} required />
          <PasswordInput
            id="password"
            label="Password *"
            required
          />

          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Login
          </Button>
        </FormControl>
      </FormBackground>
    </Fragment>
  );
}

const FormBackground = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  textAlign: "center",
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.contrastText,

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(1),
  },
}));