import { useState } from "react";

import useTokenSelector from "../redux/selectors/useTokenSelector";

type NodesMap = {[key: number]: number[]}

export function useEditNodes() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useTokenSelector();

  async function editNodesCommand(nodesMap: NodesMap) {
    setLoading(true);
    setErrorCode(null);

    if (token === null) {
      setErrorCode(401);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/coordinator/nodes",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nodesMap),
        });
      if (response.status >= 400) {
        setErrorCode(response.status);
      }
    } catch (err) {
      setErrorCode(503);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { editNodesCommand, errorCode, loading };
}