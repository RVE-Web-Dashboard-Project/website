import { useAppDispatch } from "../hooks";
import { CoordinatorsState, setNodesMap as setNodesMapFromReducer } from "../slices/coordinatorsSlice";

export default function useSetNodesMap() {
  const dispatch = useAppDispatch();

  async function setNodesMap(nodesMap: CoordinatorsState["nodesMap"]) {
    dispatch(setNodesMapFromReducer(nodesMap));
  }

  async function setNodesMapFromApi(nodesMap: Record<number, number[]>) {
    dispatch(setNodesMapFromReducer(
      Object.entries(nodesMap).reduce((acc, [key, value]) => {
        acc[parseInt(key)] = {
          selected: false,
          nodes: value.reduce((nAcc, nodeId) => {
            nAcc[nodeId] = false;
            return nAcc;
          },
          {} as { [key: number]: boolean },
          ),
        };
        return acc;
      },
      {} as Exclude<CoordinatorsState["nodesMap"], null>,
      ),
    ));
  }

  return { setNodesMap, setNodesMapFromApi };
}