import { CircularProgress, Stack, Typography } from "@mui/material";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";
import { useEditNodeSelection } from "../../repository/redux/dispatchs/useEditNodeSelection";
import { CustomCheckbox } from "./CustomCheckbox";
import { SelectionContainer } from "./SelectionContainer";

export const CoordinatorsSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();
  const { setAllCoordinatorsSelectionCommand, setCoordinatorSelectionCommand } = useEditNodeSelection();

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

  const allChecked = Object.values(nodes).every((coordinatorObject) => coordinatorObject.selected);
  const noneChecked = Object.values(nodes).every((coordinatorObject) => !coordinatorObject.selected);


  return (
    <SelectionContainer>
      <Typography variant="h5">Coordinators</Typography>
      <CustomCheckbox
        id={"all"}
        label={"Select all"}
        checked={allChecked}
        indeterminate={!allChecked && !noneChecked}
        onChange={onAllSelectorChange}
      />

      <Stack direction="row" ml={2} sx={{ gap: "0 24px" }} flexWrap="wrap">
        {Object.entries(nodes).map(([coordinatorId, coordinatorObject]) => (
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

