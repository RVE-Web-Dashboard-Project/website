import { useFetchBrokerConnectionStatus } from "../api/useFetchBrokerConnectionStatus";
import useBrokerConnectionStatusSelector from "../redux/selectors/useBrokerConnectionStatusSelector";

export function useGetOrFetchBrokerConnectionStatus() {
  const { fetchStatus, error, loading } = useFetchBrokerConnectionStatus();

  const status = useBrokerConnectionStatusSelector();

  if (status === null && !loading && !error) {
    fetchStatus();
  }

  return { status, error, loading };
}