import { useAppDispatch } from "../hooks";
import { removeInvitation as removeInvitationFromReducer } from "../slices/userSlice";

export default function useRemoveInvitation() {
  const dispatch = useAppDispatch();

  async function removeInvitation(invitationId: string) {
    dispatch(removeInvitationFromReducer(invitationId));
  }

  return { removeInvitation };
}