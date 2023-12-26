import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CircularProgress, Collapse, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
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
    <Stack useFlexGap spacing={3} direction="row">
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
  return (
    <Stack alignSelf="flex-start" sx={{ border: "1px solid black", borderRadius: "16px", overflow: "hidden" }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={`Coordinator ${coordinatorId}`} />
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