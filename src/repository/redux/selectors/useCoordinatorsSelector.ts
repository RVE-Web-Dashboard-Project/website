import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const coordinatorsSelector = createSelector(
  (state: RootState) => state.coordinators,
  (coordinators) => coordinators.nodesMap,
);

export default function useCoordinatorSelector() {
  return useAppSelector(coordinatorsSelector);
}