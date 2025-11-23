import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem("access");

  return isAuth ? children : <Navigate to="/login" replace />;
}
