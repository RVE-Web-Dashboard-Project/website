import { GlobalStyles, Paper, styled, Typography, useTheme } from "@mui/material";
import { Fragment } from "react";

import { InvitationPageContent } from "../components/InvitationPage/InvitationPageContent";
import { WebsiteName } from "../styles/theme";


export default function InvitationPage() {
  const theme = useTheme();

  return (
    <Fragment>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.primary.dark },
        }}
      />
      <CardBackground elevation={2}>
        <PageTitle variant="h4" noWrap>
          {WebsiteName}
        </PageTitle>
        <InvitationPageContent />
      </CardBackground>
    </Fragment>
  );
}

const CardBackground = styled(Paper)(({ theme }) => ({
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


const PageTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(1),
  },
}));