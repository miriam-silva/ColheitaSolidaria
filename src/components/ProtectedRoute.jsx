import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth(); // Obtém usuário e role

  if (loading) {
    return <p>Carregando...</p>; // Evita redirecionamento antes de carregar os dados
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Se não estiver logado, vai para login
  }

  if (role !== requiredRole) {
    return <Navigate to="/" replace />; // Se não tiver a role correta, vai para a home
  }

  return children;
};

export default ProtectedRoute;
