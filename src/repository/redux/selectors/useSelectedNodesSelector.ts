import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { coordinatorsSelector } from "./useCoordinatorsSelector";

const selectedNodesSelector = createSelector(
  [coordinatorsSelector],
  (nodesMap) => {
    if (nodesMap === null) return {};
    return Object.fromEntries(
      Object.entries(nodesMap)
        .filter(([coordId, coordObject]) => coordObject.selected)
        .map(([coordId, coordObject]) => [
          coordId,
          Object.entries(coordObject.nodes)
            .filter(([nodeId, nodeState]) => nodeState.selected)
            .map(([nodeId]) => Number(nodeId)),
        ]),
    );
  },
);

export default function useSelectedNodesSelector(): Record<number, number[]> {
  return useAppSelector(selectedNodesSelector);
}