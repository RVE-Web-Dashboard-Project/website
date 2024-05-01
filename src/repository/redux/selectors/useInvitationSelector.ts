import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const invitationSelector = createSelector(
  [
    (state: RootState) => state.user,
    (state: RootState, invitationId: string) => invitationId,
  ],
  (user, invitationId) => (user.invitations ? user.invitations[invitationId] : undefined),
);

export default function useInvitationSelector(invitationId: string) {
  return useAppSelector((state) => invitationSelector(state, invitationId));
}