import { useState } from "react";

import useRemoveUser from "../redux/dispatchs/useRemoveUser";
import useTokenSelector from "../redux/selectors/useTokenSelector";

export function useDeleteUser() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useTokenSelector();
  const { removeUser } = useRemoveUser();

  async function deleteUser(userId: number) {
    setLoading(true);
    setErrorCode(null);
    setSuccess(false);

    if (token === null) {
      setErrorCode(401);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/" + userId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        setSuccess(true);
        removeUser(userId);
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

  return { deleteUser, error: errorCode, loading, success };
}
