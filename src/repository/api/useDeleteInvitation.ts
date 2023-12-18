import { useState } from "react";

import useRemoveInvitation from "../redux/dispatchs/useRemoveInvitation";
import useTokenSelector from "../redux/selectors/useTokenSelector";

export function useDeleteInvitation() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useTokenSelector();
  const { removeInvitation } = useRemoveInvitation();

  async function deleteInvitation(invitationId: string) {
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
        process.env.REACT_APP_API_URL + "/invitation/" + invitationId,
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
        removeInvitation(invitationId);
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

  return { deleteInvitation, error: errorCode, loading, success };
}
