declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_API_URL: string;
  }
}

declare global {
  declare module "@mui/material/styles" {
    interface Palette {
      gray: Palette["primary"];
    }

    interface PaletteOptions {
      gray?: PaletteOptions["primary"];
    }
  }

  declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      gray: true;
    }
  }

  declare module "@mui/material/CircularProgress" {
    interface CircularProgressPropsColorOverrides {
      gray: true;
    }
  }

  declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
}
