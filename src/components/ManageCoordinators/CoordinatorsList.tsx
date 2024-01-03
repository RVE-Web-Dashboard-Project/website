import { ExpandLess, ExpandMore } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { CircularProgress, Collapse, List, ListItem, ListItemButton, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

import { useGetOrFetchNodes } from "../../repository/commands/useGetOrFetchNodes";


export const CoordinatorsList = () => {
  const { nodes: coordinators, error } = useGetOrFetchNodes();

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (coordinators === null) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Stack useFlexGap spacing={3} direction="row" flexWrap="wrap">
      {Object.entries(coordinators).map(([coordinatorId, coordinatorObject]) => (
        <CoordinatorList
          key={coordinatorId}
          coordinatorId={Number(coordinatorId)}
          nodes={coordinatorObject.nodes}
        />
      ))}
    </Stack>
  );
};

const CoordinatorList = ({ coordinatorId, nodes }: {coordinatorId: number, nodes: { [key: number]: boolean; }}) => {
  const [open, setOpen] = useState(false);
  const isEmpty = Object.keys(nodes).length === 0;

  return (
    <Stack alignSelf="flex-start" sx={{ border: "1px solid black", borderRadius: "16px", overflow: "hidden" }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={
          <Stack useFlexGap direction="row" spacing={0.5}>
            {isEmpty && <EmptyCoordinatorIcon />}
            {`Coordinator ${coordinatorId}`}
          </Stack>
        } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(nodes).map(([nodeId]) => (
            <ListItem key={nodeId}>
              <ListItemText primary={`Node ${nodeId}`} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Stack>
  );
};

const EmptyCoordinatorIcon = () => (
  <Tooltip title="Coordinator is empty">
    <WarningAmberIcon color="warning" />
  </Tooltip>
);