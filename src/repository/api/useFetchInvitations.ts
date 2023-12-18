import { useState } from "react";

import useSetInvitations from "../redux/dispatchs/useSetInvitations";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { InvitationInfo } from "../types/user";

type ApiResponse = InvitationInfo[];

export function useFetchInvitations() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InvitationInfo[] | null>(null);

  const token = useTokenSelector();
  const { setInvitations } = useSetInvitations();

  async function fetchInvitationsCommand() {
    setLoading(true);
    setError(null);

    if (token === null) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/invitation",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const json = await response.json() as ApiResponse;
        setData(json);
        setInvitations(json);
      } else if (response.status === 401) {
        setError("Invalid token");
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

  return { error, loading, data, fetchInvitationsCommand };
}