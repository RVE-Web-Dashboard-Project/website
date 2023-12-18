import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const usersSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.users,
);

export default function useUsersSelector() {
  return useAppSelector(usersSelector);
}