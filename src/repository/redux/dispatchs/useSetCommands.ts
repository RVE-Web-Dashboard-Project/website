import { Command } from "../../types/command";
import { useAppDispatch } from "../hooks";
import { setCommands as setCommandsFromReducer } from "../slices/commandsSlice";

export default function useSetCommands() {
  const dispatch = useAppDispatch();

  async function setCommands(commands: Command[]) {
    dispatch(setCommandsFromReducer(commands));
  }

  return { setCommands };
}