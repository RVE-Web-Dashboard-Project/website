import { useState } from "react";

import useSetToken from "../redux/dispatchs/useSetToken";
import useSetUser from "../redux/dispatchs/useSetUser";
import { UserObject } from "../types/user";

interface AcceptInvitationParams {
  password: string;
}

interface ApiResponse extends UserObject {
  token: string;
}

export function useAcceptInvitation() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setTokenCommand } = useSetToken();
  const { setCurrentUserCommand } = useSetUser();

  async function acceptInvitation(invitationId: string, params: AcceptInvitationParams) {
    setLoading(true);
    setErrorCode(null);
    setSuccess(false);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/invitation/" + invitationId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        },
      );
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setSuccess(true);
        setTokenCommand(json.token);
        setCurrentUserCommand(json);
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

  return { acceptInvitation, errorCode, loading, success };
}