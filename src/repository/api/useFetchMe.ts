import { useState } from "react";

import { AuthenticatedUserObject } from "../types/user";

export function useFetchMe() {
  const [error, _setError] = useState<string | null>(null);
  const [loading, _setLoading] = useState(false);
  const [data, _setData] = useState<AuthenticatedUserObject | null>(null);

  // const token = useTokenSelector();
  // const { setUserCommand } = useSetUser();
  // const { logoutCommand } = useLogout();

  async function fetchMeCommand() {
    // TODO: call the API to fetch the user
  }

  return { fetchMeCommand, error, loading, data };
}