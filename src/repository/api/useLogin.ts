import { useState } from "react";

import useLogout from "../redux/dispatchs/useLogout";
import useSetToken from "../redux/dispatchs/useSetToken";
import useSetUser from "../redux/dispatchs/useSetUser";

interface LoginJSONResponse {
  success: true,
  data: {
    token: string;
    id: string;
    name: string;
    isAdmin: boolean;
    createdAt: Date;
  }
}

export function useLogin() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginJSONResponse | null>(null);

  const { setTokenCommand } = useSetToken();
  const { setUserCommand } = useSetUser();
  const { logoutCommand } = useLogout();

  async function loginCommand(username: string, password: string) {
    setLoading(true);
    setErrorCode(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/login",
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
        setTokenCommand(json.data.token);
        setUserCommand({
          id: json.data.id,
          name: json.data.name,
          isAdmin: json.data.isAdmin,
          createdAt: json.data.createdAt,
        });
      } else if (response.status === 401) {
        setErrorCode(401);
        logoutCommand();
      } else {
        setErrorCode(response.status);
      }
    } catch (err) {
      setErrorCode(500);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { loginCommand, error: errorCode, loading, data };
}
