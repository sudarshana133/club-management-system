import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "../../utils/auth";

interface ProtectedRouteProps {
  allowedRoles?: "STUDENT" | "ADMIN";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const user = verifyToken();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles?.includes(user.role)) {
    return <Outlet />;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;