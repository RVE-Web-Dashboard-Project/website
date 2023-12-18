import { useAppDispatch } from "../hooks";
import { removeUser as removeUserFromReducer } from "../slices/userSlice";

export default function useRemoveUser() {
  const dispatch = useAppDispatch();

  async function removeUser(userId: number) {
    dispatch(removeUserFromReducer(userId));
  }

  return { removeUser };
}