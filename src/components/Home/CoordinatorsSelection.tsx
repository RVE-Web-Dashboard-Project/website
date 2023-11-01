import { CircularProgress, Typography } from "@mui/material";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";
import { useEditNodeSelection } from "../../repository/redux/dispatchs/useEditNodeSelection";
import { CustomCheckbox } from "./CustomCheckbox";
import { SelectionContainer } from "./SelectionContainer";

export const CoordinatorsSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();
  const { setCoordinatorSelectionCommand } = useEditNodeSelection();

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const onCoordinatorChange = (coordinatorId: string, isChecked: boolean) => {
    setCoordinatorSelectionCommand(Number(coordinatorId), isChecked);
  };


  return (
    <SelectionContainer>
      <Typography variant="h5">Coordinators</Typography>
      <ul>
        {Object.entries(nodes).map(([coordinatorId, coordinatorObject]) => (
          <CustomCheckbox
            key={coordinatorId}
            id={coordinatorId}
            label={coordinatorId}
            checked={coordinatorObject.selected}
            onChange={onCoordinatorChange}
          />
        ))}
      </ul>
    </SelectionContainer>
  );
};

