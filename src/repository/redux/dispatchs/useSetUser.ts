import { UserObject } from "../../types/user";
import { useAppDispatch } from "../hooks";
import { login, setUsers } from "../slices/userSlice";

export default function useSetUser() {
  const dispatch = useAppDispatch();

  async function setCurrentUserCommand(user: UserObject) {
    dispatch(login(user));
  }

  async function setUsersCommand(users: UserObject[]) {
    dispatch(setUsers(users));
  }

  return { setCurrentUserCommand, setUsersCommand };
}