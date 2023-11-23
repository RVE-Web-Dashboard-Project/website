import { useState } from "react";

import useSetNodesMap from "../redux/dispatchs/useSetNodesMap";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { CoordinatorsState } from "../redux/slices/coordinatorsSlice";

type ApiResponse = {[key: number]: number[]};

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
        import.meta.env.VITE_APP_API_URL + "/coordinator/nodes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json);
        setNodesMap(
          Object.entries(json).reduce((acc, [key, value]) => {
            acc[parseInt(key)] = {
              selected: false,
              nodes: value.reduce((nAcc, nodeId) => {
                nAcc[nodeId] = false;
                return nAcc;
              },
              {} as {[key: number]: boolean},
              ),
            };
            return acc;
          },
          {} as Exclude<CoordinatorsState["nodesMap"], null>,
          ),
        );
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