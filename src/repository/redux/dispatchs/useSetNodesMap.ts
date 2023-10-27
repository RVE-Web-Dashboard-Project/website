import { useAppDispatch } from "../hooks";
import { CoordinatorsState, setNodesMap as setNodesMapFromReducer } from "../slices/coordinatorsSlice";

export default function useSetNodesMap() {
  const dispatch = useAppDispatch();

  async function setNodesMap(nodesMap: CoordinatorsState["nodesMap"]) {
    dispatch(setNodesMapFromReducer(nodesMap));
  }

  return { setNodesMap };
}