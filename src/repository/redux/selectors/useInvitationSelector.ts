import { createSelector } from "@reduxjs/toolkit";

import { InvitationInfo } from "../../types/user";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

const invitationSelector = createSelector(
  [
    (state: RootState) => state.user,
    (state: RootState, invitationId: string) => invitationId,
  ],
  (user, invitationId) => user.invitations[invitationId] as InvitationInfo | undefined,
);

export default function useInvitationSelector(invitationId: string) {
  return useAppSelector((state) => invitationSelector(state, invitationId));
}