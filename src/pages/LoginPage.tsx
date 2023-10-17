import { GlobalStyles, Paper, styled, useTheme } from "@mui/material";
import { Fragment } from "react";

import LoginForm from "../components/Login/LoginForm";

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
        <LoginForm />
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
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  textAlign: "center",
}));
