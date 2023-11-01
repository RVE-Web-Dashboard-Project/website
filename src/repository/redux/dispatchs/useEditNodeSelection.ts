import { useAppDispatch } from "../hooks";
import { setCoordinatorSelection, setNodeSelection } from "../slices/coordinatorsSlice";


export function useEditNodeSelection() {
  const dispatch = useAppDispatch();

  async function setCoordinatorSelectionCommand(coordinatorId: number, selected: boolean) {
    dispatch(setCoordinatorSelection({ coordinatorId, selected }));
  }

  async function setNodeSelectionCommand(coordinatorId: number, nodeId: number, selected: boolean) {
    dispatch(setNodeSelection({ coordinatorId, nodeId, selected }));
  }

  return { setCoordinatorSelectionCommand, setNodeSelectionCommand };
}