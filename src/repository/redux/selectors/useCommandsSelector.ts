import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const commandsSelector = createSelector(
  (state: RootState) => state.commands,
  (commands) => commands.commands,
);

export default function useCommandsSelector() {
  return useAppSelector(commandsSelector);
}