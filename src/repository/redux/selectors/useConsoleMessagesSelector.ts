import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const consoleMessagesSelector = createSelector(
  (state: RootState) => state.commands,
  (commands) => commands.messages,
);

export default function useConsoleMessagesSelector() {
  return useAppSelector(consoleMessagesSelector);
}