import { useGetOrFetchMe } from "./useGetOrFetchMe";


export function useIsAuthenticated() {
  const { user, loading } = useGetOrFetchMe();
  return { isAuthenticated: !!user, loading };
}