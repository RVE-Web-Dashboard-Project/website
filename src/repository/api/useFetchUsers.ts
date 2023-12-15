import { useState } from "react";

import useTokenSelector from "../redux/selectors/useTokenSelector";
import { UserObject } from "../types/user";

type ApiResponse = UserObject[];

export function useFetchUsers() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserObject[] | null>(null);

  const token = useTokenSelector();

  async function fetchUsersCommand() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json);
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

  return { error, loading, data, fetchUsersCommand };
}