import { createTheme, LinkProps } from "@mui/material";

import LinkBehavior from "./LinkBehavior";

export const WebsiteName = "RVE Station";

export const RveTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#D70A18",
    },
    secondary: {
      main: "#0AD7C9",
    },
  },
});