import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const userSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.users[user.userId ?? ""],
);

export default function useUserSelector() {
  return useAppSelector(userSelector);
}