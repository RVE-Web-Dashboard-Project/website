import { useState } from "react";

import useLogout from "../redux/dispatchs/useLogout";
import useSetToken from "../redux/dispatchs/useSetToken";
import useSetUser from "../redux/dispatchs/useSetUser";
import { UserObject } from "../types/user";

interface ApiResponse extends UserObject {
  token: string;
}

export function useLogin() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const { setTokenCommand } = useSetToken();
  const { setCurrentUserCommand } = useSetUser();
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
        const json = await response.json() as ApiResponse;
        setData(json);
        setTokenCommand(json.token);
        setCurrentUserCommand({
          id: json.id,
          name: json.name,
          isAdmin: json.isAdmin,
          createdAt: json.createdAt,
        });
      } else if (response.status === 401) {
        setErrorCode(401);
        logoutCommand();
      } else {
        setErrorCode(response.status);
      }
    } catch (err) {
      setErrorCode(503);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { loginCommand, errorCode, loading, data };
}
