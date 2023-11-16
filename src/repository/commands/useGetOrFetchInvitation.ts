import { useFetchInvitationInfo } from "../api/useFetchInvitationInfo";
import useInvitationSelector from "../redux/selectors/useInvitationSelector";

export function useGetOrFetchInvitation(invitationId: string) {
  const { fetchInvitation, error, loading } = useFetchInvitationInfo();

  const invitation = useInvitationSelector(invitationId);

  if (invitation === undefined && !loading && !error) {
    fetchInvitation(invitationId);
  }

  return { invitation, error, loading };
}