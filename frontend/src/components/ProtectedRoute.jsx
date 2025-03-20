import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <p>Loading...</p>;
  if (!authUser) return <Navigate to="/connections" replace />;

  return children;
};

export default ProtectedRoute;
