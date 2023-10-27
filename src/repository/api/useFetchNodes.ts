import { useState } from "react";

import useSetNodesMap from "../redux/dispatchs/useSetNodesMap";
import useTokenSelector from "../redux/selectors/useTokenSelector";

interface ApiResponse {
  success: true,
  data: {[key: number]: number[]}
}

export function useFetchNodes() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{[key: number]: number[]} | null>(null);

  const token = useTokenSelector();
  const { setNodesMap } = useSetNodesMap();

  async function fetchNodesCommand() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/coordinator/nodes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json.data);
        setNodesMap(json.data);
      } else if (response.status === 401) {
        setError("Invalid token");
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

  return { fetchNodesCommand, error, loading, data };
}