import { Drawer, Toolbar } from "@mui/material";

import { useIsOnMobile } from "../../../styles/useIsOnMobile";

interface NodesPingStatusDrawerProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

export const NodesPingStatusDrawer = ({ open, onClose }: NodesPingStatusDrawerProps) => {
  const isOnMobile = useIsOnMobile();

  return (
    <Drawer
      variant={isOnMobile ? "temporary" : "persistent"}
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <h1>Hello world</h1>
      <h1>Hello world 2</h1>
      <h1>Hello world 3</h1>
      <h1>Hello world 4</h1>
      <h1>Hello world 5</h1>
    </Drawer>
  );
};