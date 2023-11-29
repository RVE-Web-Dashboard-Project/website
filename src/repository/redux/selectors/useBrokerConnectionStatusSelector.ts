import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const brokerConnectionStatusSelector = createSelector(
  (state: RootState) => state.commands,
  (commands) => commands.brokerConnectionStatus,
);

export default function useBrokerConnectionStatusSelector() {
  return useAppSelector(brokerConnectionStatusSelector);
}