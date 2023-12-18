import { InvitationInfo } from "../../types/user";
import { useAppDispatch } from "../hooks";
import { setInvitations as setInvitationsFromReducer } from "../slices/userSlice";

export default function useSetInvitations() {
  const dispatch = useAppDispatch();

  async function setInvitations(invitations: InvitationInfo[]) {
    dispatch(setInvitationsFromReducer(invitations));
  }

  return { setInvitations };
}