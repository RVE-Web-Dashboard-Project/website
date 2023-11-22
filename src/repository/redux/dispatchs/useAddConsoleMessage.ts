import { ConsoleMessage } from "../../types/console";
import { useAppDispatch } from "../hooks";
import { addMessage } from "../slices/commandsSlice";

export default function useAddConsoleMessage() {
  const dispatch = useAppDispatch();

  async function addConsoleMessage(message: ConsoleMessage) {
    dispatch(addMessage(message));
  }

  return { addConsoleMessage };
}