import { useAppSelector } from "../hooks";

export default function useOngoingCommandsSelector() {
  return useAppSelector((state) => state.commands.ongoingCommands);
}