import { CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

import { useGetOrFetchNodes } from "../../repository/commands/useGetOrFetchNodes";
import { useEditNodeSelection } from "../../repository/redux/dispatchs/useEditNodeSelection";
import { CustomCheckbox } from "./CustomCheckbox";
import { SelectionContainer } from "./SelectionContainer";

export const CoordinatorsSelection = () => {
  const { nodes, error, loading } = useGetOrFetchNodes();
  const { setAllCoordinatorsSelectionCommand, setCoordinatorSelectionCommand } = useEditNodeSelection();

  const shownCoordinators = useMemo(() => {
    if (nodes === null) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(nodes).filter(([coordinatorId, coordinatorObject]) => Object.keys(coordinatorObject.nodes).length > 0),
    );
  }, [nodes]);

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const onAllSelectorChange = (_componentId: string, isChecked: boolean) => {
    setAllCoordinatorsSelectionCommand(isChecked);
  };

  const onCoordinatorChange = (coordinatorId: string, isChecked: boolean) => {
    setCoordinatorSelectionCommand(Number(coordinatorId), isChecked);
  };

  const allChecked = Object.values(shownCoordinators).every((coordinatorObject) => coordinatorObject.selected);
  const noneChecked = Object.values(shownCoordinators).every((coordinatorObject) => !coordinatorObject.selected);


  return (
    <SelectionContainer>
      <Typography variant="h5" mb={1}>Coordinators</Typography>
      <CustomCheckbox
        id={"all"}
        label={"Select all"}
        checked={allChecked}
        indeterminate={!allChecked && !noneChecked}
        onChange={onAllSelectorChange}
      />

      <Stack direction="row" ml={2} sx={{ gap: "0 24px" }} flexWrap="wrap">
        {Object.entries(shownCoordinators).map(([coordinatorId, coordinatorObject]) => (
          <CustomCheckbox
            key={coordinatorId}
            id={coordinatorId}
            label={coordinatorId}
            checked={coordinatorObject.selected}
            onChange={onCoordinatorChange}
          />
        ))}
      </Stack>
    </SelectionContainer>
  );
};

