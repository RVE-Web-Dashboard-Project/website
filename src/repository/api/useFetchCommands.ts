import { useState } from "react";

import useSetCommands from "../redux/dispatchs/useSetCommands";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { Command } from "../types/command";

interface ApiResponse {
  success: true,
  data: Command[],
}

export function useFetchCommands() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Command[] | null>(null);

  const token = useTokenSelector();
  const { setCommands } = useSetCommands();

  async function fetchCommands() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/commands",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json.data);
        setCommands(json.data);
      }
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchCommands, error, loading, data };
}