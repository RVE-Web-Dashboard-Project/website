import { InvitationInfo } from "../../types/user";
import { useAppDispatch } from "../hooks";
import { setInvitation as setInvitationFromReducer } from "../slices/userSlice";

export default function useSetInvitation() {
  const dispatch = useAppDispatch();

  async function setInvitation(invitation: InvitationInfo) {
    dispatch(setInvitationFromReducer(invitation));
  }

  return { setInvitation };
}