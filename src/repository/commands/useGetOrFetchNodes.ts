import { useFetchNodes } from "../api/useFetchNodes";
import useCoordinatorSelector from "../redux/selectors/useCoordinatorsSelector";


export function useGetOrFetchNodes() {
  const { fetchNodesCommand, error, loading } = useFetchNodes();

  const nodes = useCoordinatorSelector();

  if (nodes === null && !loading && !error) {
    fetchNodesCommand();
  }

  return { nodes, error, loading };
}