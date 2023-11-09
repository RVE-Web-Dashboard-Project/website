import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { coordinatorsSelector } from "./useCoordinatorsSelector";

const selectedNodesSelector = createSelector(
  [coordinatorsSelector],
  (nodesMap) => {
    if (nodesMap === null) return {};
    return Object.fromEntries(
      Object.entries(nodesMap).map(([coordId, coordObject]) => [
        coordId,
        Object.entries(coordObject.nodes)
          .filter(([nodeId, isSelected]) => isSelected)
          .map(([nodeId]) => Number(nodeId)),
      ])
        .filter(([, selectedNodes]) => selectedNodes.length > 0),
    );
  },
);

export default function useSelectedNodesSelector() {
  return useAppSelector(selectedNodesSelector);
}