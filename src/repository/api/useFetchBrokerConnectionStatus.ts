import { useState } from "react";

import useSetBrokerConnectionStatus from "../redux/dispatchs/useSetBrokerConnectionStatus";
import useTokenSelector from "../redux/selectors/useTokenSelector";

interface ApiResponse {
  status: string
}

export function useFetchBrokerConnectionStatus() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const token = useTokenSelector();
  const { setBrokerConnectionStatus } = useSetBrokerConnectionStatus();

  async function fetchStatus() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/commands/broker",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json.status);
        setBrokerConnectionStatus(json.status);
      } else if (response.status === 401) {
        setError("Error: Unauthorized");
      } else {
        setError(`Something went wrong: code ${response.status}`);
      }
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchStatus, error, loading, data };
}