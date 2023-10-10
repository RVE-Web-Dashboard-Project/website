import { Navigate } from "react-router-dom";

import LoadingPage from "../../pages/genericPages/LoadingPage";
// TODO: add authentication logic
// import { useIsAuthenticated } from "../../repository/commands/useIsAuthenticated";


export default function UnAuthGuard({ children }: {children: JSX.Element}) {
  // const { isAuthenticated, loading } = useIsAuthenticated();
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    console.log("UnAuthGuard: user is authenticated, redirecting to home");
    return <Navigate to="/" />;
  }
  return children;

}