import { useState } from "react";

import useLogout from "../redux/dispatchs/useLogout";
import useSetUser from "../redux/dispatchs/useSetUser";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { UserObject } from "../types/user";

type ApiResponse = UserObject;

export function useFetchMe() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserObject | null>(null);

  const token = useTokenSelector();
  const { setCurrentUserCommand } = useSetUser();
  const { logoutCommand } = useLogout();

  async function fetchMeCommand() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json);
        setCurrentUserCommand(json);
      } else if (response.status === 401) {
        setError("Invalid token");
        logoutCommand();
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

  return { fetchMeCommand, error, loading, data };
}