import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const ongoingCommandsSelector = createSelector(
  (state: RootState) => state.commands.ongoingCommands,
  (ongoingCommands) => ongoingCommands,
);

export default function useOngoingCommandsSelector() {
  return useAppSelector(ongoingCommandsSelector);
}