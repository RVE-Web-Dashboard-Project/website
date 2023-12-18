import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const invitationsSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.invitations,
);

export default function useInvitationsSelector() {
  return useAppSelector(invitationsSelector);
}