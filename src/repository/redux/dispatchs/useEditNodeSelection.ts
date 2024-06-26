import { useAppDispatch } from "../hooks";
import { setAllCoordinatorsSelection, setAllNodesSelection, setCoordinatorSelection, setNodeSelection } from "../slices/coordinatorsSlice";


export function useEditNodeSelection() {
  const dispatch = useAppDispatch();

  async function setAllCoordinatorsSelectionCommand(selected: boolean) {
    dispatch(setAllCoordinatorsSelection(selected));
  }

  async function setCoordinatorSelectionCommand(coordinatorId: number, selected: boolean) {
    dispatch(setCoordinatorSelection({ coordinatorId, selected }));
  }

  async function setAllNodesSelectionCommand(coordinatorId: number, selected: boolean) {
    dispatch(setAllNodesSelection({ coordinatorId, selected }));
  }

  async function setNodeSelectionCommand(coordinatorId: number, nodeId: number, selected: boolean) {
    dispatch(setNodeSelection({ coordinatorId, nodeId, selected }));
  }

  return { setAllCoordinatorsSelectionCommand, setCoordinatorSelectionCommand, setAllNodesSelectionCommand, setNodeSelectionCommand };
}