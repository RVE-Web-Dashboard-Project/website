import { useState } from "react";

import useSetCommands from "../redux/dispatchs/useSetCommands";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { Command } from "../types/command";

type ApiResponse = Command[];

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
        setData(json);
        setCommands(json);
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

  return { fetchCommands, error, loading, data };
}