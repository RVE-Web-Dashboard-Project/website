import { useState } from "react";

import { useGetOrFetchMe } from "../commands/useGetOrFetchMe";
import useSetInvitation from "../redux/dispatchs/useSetInvitation";
import useTokenSelector from "../redux/selectors/useTokenSelector";

interface ApiResponse {
  id: string;
  username: string;
  createdAt: string;
}

export function useCreateInvitation() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useTokenSelector();
  const { user } = useGetOrFetchMe();
  const { setInvitation } = useSetInvitation();

  async function createInvitation(username: string) {
    setLoading(true);
    setErrorCode(null);
    setSuccess(false);

    if (token === null || user === undefined) {
      setErrorCode(401);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/invitation",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        },
      );
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setSuccess(true);
        setInvitation({
          ...json,
          inviter: user.name,
          inviterId: user.id,
        });
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

  return { createInvitation, error: errorCode, loading, success };
}