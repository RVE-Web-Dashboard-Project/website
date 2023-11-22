import { useAppDispatch } from "../hooks";
import { resetConsole } from "../slices/commandsSlice";

export default function useResetConsole() {
  const dispatch = useAppDispatch();

  async function resetConsoleCommand() {
    dispatch(resetConsole());
  }

  return { resetConsoleCommand };
}