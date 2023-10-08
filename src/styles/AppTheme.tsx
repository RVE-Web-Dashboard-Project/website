import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { RveTheme } from "./theme";

export const AppTheme = ({ children }: { children: JSX.Element }) => (
  <ThemeProvider theme={RveTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
