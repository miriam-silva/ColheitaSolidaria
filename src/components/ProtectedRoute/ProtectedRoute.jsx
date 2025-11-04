import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && tipoUsuario?.toLowerCase() !== requiredRole.toLowerCase()) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          requiredRole,
          currentRole: tipoUsuario,
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
