import { useGetorFetchMe } from "./useGetorFetchMe";


export function useIsAuthenticated() {
  const { user, loading } = useGetorFetchMe();
  return { isAuthenticated: user !== null, loading };
}