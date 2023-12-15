import { Navigate } from "react-router-dom";

import LoadingPage from "../../pages/genericPages/LoadingPage";
import { useGetOrFetchMe } from "../../repository/commands/useGetOrFetchMe";

export default function AdminGuard({ children }: {children: JSX.Element}) {
  const { user, loading } = useGetOrFetchMe();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user?.isAdmin) {
    console.log("AdminGuard: user is NOT admin, redirecting to home");
    return <Navigate to="/" />;
  }

  return children;
}