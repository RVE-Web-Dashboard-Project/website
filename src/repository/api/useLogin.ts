import { useState } from "react";

import useLogout from "../redux/dispatchs/useLogout";
import useSetToken from "../redux/dispatchs/useSetToken";
import useSetUser from "../redux/dispatchs/useSetUser";

interface LoginJSONResponse {
  token: string;
  id: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginJSONResponse | null>(null);

  const { setTokenCommand } = useSetToken();
  const { setUserCommand } = useSetUser();
  const { logoutCommand } = useLogout();

  async function loginCommand(username: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
      if (response.status === 200) {
        const json = await response.json() as LoginJSONResponse;
        setData(json);
        setTokenCommand(json.token);
        setUserCommand({
          id: json.id,
          name: json.name,
          isAdmin: json.isAdmin,
          createdAt: json.createdAt,
        });
      } else if (response.status === 401) {
        setError("Invalid credentials");
        logoutCommand();
      } else {
        setError(`Something went wrong: ${response.status} code`);
      }
    } catch (err) {
      setError("Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { loginCommand, error, loading, data };
}