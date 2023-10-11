import { Navigate } from "react-router-dom";

import LoadingPage from "../../pages/genericPages/LoadingPage";
import { useIsAuthenticated } from "../../repository/commands/userIsAuthenticated";


export default function AuthGuard({ children }: {children: JSX.Element}) {
  const { isAuthenticated, loading } = useIsAuthenticated();


  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    console.log("AuthGuard: user is NOT authenticated, redirecting to ligin");
    return <Navigate to="/login" />;
  }

  return children;

}