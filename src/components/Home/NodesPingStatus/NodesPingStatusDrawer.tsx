import { Check, Close, ExpandLess, ExpandMore, QuestionMark } from "@mui/icons-material";
import { Chip, Collapse, Drawer, List, ListItemButton, ListItemText, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

import useCoordinatorSelector from "../../../repository/redux/selectors/useCoordinatorsSelector";
import { NodesState } from "../../../repository/redux/slices/coordinatorsSlice";
import { useIsOnMobile } from "../../../styles/useIsOnMobile";
import { PingAllNodesButton } from "./PingAllNodesButton";

interface NodesPingStatusDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const NodesPingStatusDrawerWidth = 340;

export const NodesPingStatusDrawer = ({ open, onClose }: NodesPingStatusDrawerProps) => {
  const isOnMobile = useIsOnMobile();

  return (
    <Drawer
      variant={isOnMobile ? "temporary" : "persistent"}
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: NodesPingStatusDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          padding: 2,
          width: NodesPingStatusDrawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Typography variant="h5" textAlign="center" noWrap flexShrink={0}>Nodes Ping Status</Typography>
      <DrawerContent />
    </Drawer>
  );
};

const DrawerContent = () => {
  const coordinators = useCoordinatorSelector();

  if (coordinators === null) {
    return <Typography color="error">No coordinator to show</Typography>;
  }

  const notEmptyCoordinators = Object.entries(coordinators).filter(([_, coordinator]) => Object.keys(coordinator.nodes).length > 0);

  return (
    <Stack spacing={2} pt={2}>
      <PingAllNodesButton coordinators={notEmptyCoordinators} />
      {notEmptyCoordinators.map(([coordinatorId, coordinatorObject]) => (
        <CoordinatorList
          key={coordinatorId}
          coordinatorId={Number(coordinatorId)}
          nodes={coordinatorObject.nodes}
        />
      ))}
    </Stack>
  );
};

const CoordinatorList = ({ coordinatorId, nodes }: {coordinatorId: number, nodes: NodesState}) => {
  const [open, setOpen] = useState(true);

  return (
    <Stack alignSelf="flex-start" width="100%">
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={`Coordinator ${coordinatorId}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ px: 0.5 }}>
          {Object.entries(nodes).map(([nodeId, data]) => (
            <NodeItem nodeId={nodeId} nodeStatus={data.lastStatus} key={nodeId} />
          ))}
        </List>
      </Collapse>
    </Stack>
  );
};

const NodeItem = ({ nodeId, nodeStatus }: {nodeId: string, nodeStatus: null | boolean}) => (
  <Tooltip title={nodeStatus === null ? "Unknown status" : nodeStatus ? "Online" : "Offline" }>
    <Chip
      icon={nodeStatus === null ? <QuestionMark /> : nodeStatus ? <Check /> : <Close />}
      color={nodeStatus === null ? "default" : nodeStatus ? "success" : "error"}
      label={`Node ${nodeId}`}
      variant="outlined"
      sx={{ m: 0.5 }}
      size="small"
    />
  </Tooltip>
);