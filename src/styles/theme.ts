import { createTheme, LinkProps } from "@mui/material";

import LinkBehavior from "./LinkBehavior";

export const WebsiteName = "RVE Station";

const baseTheme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

export const RveTheme = createTheme(baseTheme, {
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
      main: "#09c3b6",
    },
    gray: baseTheme.palette.augmentColor({
      color: {
        main: "#808080",
      },
      name: "gray",
    }),
  },
});