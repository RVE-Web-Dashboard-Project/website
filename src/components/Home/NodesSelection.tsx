import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";
import { useEditNodeSelection } from "../../repository/redux/dispatchs/useEditNodeSelection";
import { CustomCheckbox } from "./CustomCheckbox";
import { SelectionContainer } from "./SelectionContainer";

export const NodesSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();
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
      Object.entries(shownNodes).map(([coordinatorId, nodesObject]) => ([
        coordinatorId,
        Object.entries(nodesObject.nodes).every(([nodeId, nodeSelected]) => nodeSelected),
      ]
      )),
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
            checked={entireCoordinatorChecked[coordinatorId]}
            // indeterminate={!allChecked && !noneChecked}
            onChange={onEntireCoordinatorChange}
          />

          <Stack direction="row" ml={2} sx={{ gap: "0 24px" }} flexWrap="wrap">
            {
              Object.entries(nodesObject.nodes).map(([nodeId, nodeSelected]) => (
                <CustomCheckbox
                  key={coordinatorId + "-" + nodeId}
                  id={coordinatorId + "-" + nodeId}
                  label={nodeId}
                  checked={nodeSelected}
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
      <Typography variant="h5" mb={1}>Nodes</Typography>
      {anyCoordinatorShown ? SelectorsComponent : <NoCoordinatorError />}
    </SelectionContainer>
  );
};

const NoCoordinatorError = () => (
  <Stack flex={1} justifyContent="center" marginLeft={1}>
    <Typography color="error">No coordinator selected</Typography>
  </Stack>
);