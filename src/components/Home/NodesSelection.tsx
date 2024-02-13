import ChecklistIcon from "@mui/icons-material/Checklist";
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";

import { useGetOrFetchNodes } from "../../repository/commands/useGetOrFetchNodes";
import { useEditNodeSelection } from "../../repository/redux/dispatchs/useEditNodeSelection";
import { useIsOnMobile } from "../../styles/useIsOnMobile";
import { CustomCheckbox } from "./CustomCheckbox";
import { SelectionContainer } from "./SelectionContainer";

interface NodesSelectionProps {
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}

export const NodesSelection = ({ isDrawerOpen, onDrawerToggle }: NodesSelectionProps) => {
  const { nodes, error, loading } = useGetOrFetchNodes();
  const { setAllNodesSelectionCommand, setNodeSelectionCommand } = useEditNodeSelection();

  const shownNodes = useMemo(() => {
    if (nodes === null) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(nodes).filter(([coordinatorId, nodesObject]) => nodesObject.selected),
    );
  }, [nodes]);

  const entireCoordinatorChecked = useMemo(() =>
    // build a map of coordinatorId -> boolean
    Object.fromEntries(
      Object.entries(shownNodes).map(([coordinatorId, nodesObject]) => {
        const allSelected = Object.values(nodesObject.nodes).every(node => node.selected);
        const anySelected = Object.values(nodesObject.nodes).some(node => node.selected);
        return [
          coordinatorId,
          {
            checked: allSelected,
            indeterminate: !allSelected && anySelected,
          },
        ];
      }),
    )
  , [shownNodes]);

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const anyCoordinatorShown = Object.keys(shownNodes).length > 0;

  const onEntireCoordinatorChange = (coordinatorId: string, isChecked: boolean) => {
    setAllNodesSelectionCommand(Number(coordinatorId), isChecked);
  };

  const onNodeChange = (componentId: string, isChecked: boolean) => {
    // componentId is in the format "coordinatorId-nodeId"
    const [coordinatorId, nodeId] = componentId.split("-");
    setNodeSelectionCommand(Number(coordinatorId), Number(nodeId), isChecked);
  };

  const SelectorsComponent = (
    <Fragment>
      {Object.entries(shownNodes).map(([coordinatorId, nodesObject]) => (
        <Box key={coordinatorId} my={1}>
          <Typography variant="body1" color="GrayText">{`Coordinator ${coordinatorId}`}</Typography>
          <CustomCheckbox
            id={coordinatorId}
            label={"Select all"}
            checked={entireCoordinatorChecked[coordinatorId].checked}
            indeterminate={entireCoordinatorChecked[coordinatorId].indeterminate}
            onChange={onEntireCoordinatorChange}
          />

          <Stack direction="row" ml={2} sx={{ gap: "0 24px" }} flexWrap="wrap">
            {
              Object.entries(nodesObject.nodes).map(([nodeId, nodeSelected]) => (
                <CustomCheckbox
                  key={coordinatorId + "-" + nodeId}
                  id={coordinatorId + "-" + nodeId}
                  label={nodeId}
                  checked={nodeSelected.selected}
                  onChange={onNodeChange}
                />
              ))}
          </Stack>
        </Box>
      ))}
    </Fragment>
  );

  return (
    <SelectionContainer>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">
          Nodes
        </Typography>
        <OpenDrawerButton isDrawerOpen={isDrawerOpen} onDrawerToggle={onDrawerToggle} />
      </Stack>
      {anyCoordinatorShown ? SelectorsComponent : <NoCoordinatorError />}
    </SelectionContainer>
  );
};

const NoCoordinatorError = () => (
  <Stack flex={1} justifyContent="center" marginLeft={1}>
    <Typography color="error">Please select a coordinator first.</Typography>
  </Stack>
);

const OpenDrawerButton = ({ isDrawerOpen, onDrawerToggle }: NodesSelectionProps) => {
  const isOnMobile = useIsOnMobile();
  if (isOnMobile) {
    return (
      <IconButton
        color="secondary"
        onClick={onDrawerToggle}
        aria-label="open drawer"
      >
        <ChecklistIcon/>
      </IconButton>
    );
  }

  return (
    <Button variant={isDrawerOpen ? "outlined" : "text"} size="small" endIcon={<ChecklistIcon />} onClick={onDrawerToggle} color="secondary">
      {isDrawerOpen ? "Hide nodes status" : "See nodes status"}
    </Button>
  );
};