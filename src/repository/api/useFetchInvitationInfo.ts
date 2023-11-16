import { useState } from "react";

import useSetInvitation from "../redux/dispatchs/useSetInvitation";
import { InvitationInfo } from "../types/user";

type ApiResponse = InvitationInfo;

export function useFetchInvitationInfo() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InvitationInfo | null>(null);

  const { setInvitation } = useSetInvitation();

  async function fetchInvitation(invitationId: string) {
    setLoading(true);
    setErrorCode(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/invitation/" + invitationId,
        {
          method: "GET",
        },
      );
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json);
        setInvitation(json);
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

  return { fetchInvitation, error: errorCode, loading, data };
}