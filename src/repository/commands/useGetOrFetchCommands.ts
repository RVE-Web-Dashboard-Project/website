import { useFetchCommands } from "../api/useFetchCommands";
import useCommandsSelector from "../redux/selectors/useCommandsSelector";

export function useGetOrFetchCommands() {
  const { fetchCommands, error, loading } = useFetchCommands();

  const commands = useCommandsSelector();

  if (commands.length === 0 && !loading && !error) {
    fetchCommands();
  }

  return { commands, error, loading };
}