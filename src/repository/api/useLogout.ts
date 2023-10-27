import { useState } from "react";

import useReduxLogout from "../redux/dispatchs/useLogout";
import useTokenSelector from "../redux/selectors/useTokenSelector";


export function useLogout() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useTokenSelector();
  const { logoutCommand: reduxLogoutCommand } = useReduxLogout();

  async function logoutCommand() {
    setLoading(true);
    setErrorCode(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/logout",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + token,
          },
        });
      if (response.status === 200) {
        reduxLogoutCommand();
      } else if (response.status === 401) {
        setErrorCode(401);
        reduxLogoutCommand();
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

  return { logoutCommand, error: errorCode, loading };
}
