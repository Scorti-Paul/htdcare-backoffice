import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ cookies, children }: any) => {
  if (!cookies?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
