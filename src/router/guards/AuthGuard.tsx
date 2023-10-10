import { Navigate } from "react-router-dom";

import LoadingPage from "../../pages/genericPages/LoadingPage";
// TODO: add authentication logic
// import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function AuthGuard({ children }: {children: JSX.Element}) {
  // const { isAuthenticated, loading } = useIsAuthenticated();
  const isAuthenticated = false;
  const loading = false;


  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    console.log("AuthGuard: user is NOT authenticated, redirecting to ligin");
    return <Navigate to="/login" />;
  }

  return children;

}