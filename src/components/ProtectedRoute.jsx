import { Navigate } from "react-router-dom";
import { useAuthentication } from '../hooks/useAuthentication';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading, error } = useAuthentication();

  if (loading) {
    return <LoadingSpinner />; 
  }

  if (error) {
    console.error("Erro de autenticação:", error);
    return <Navigate to="/error" state={{ error }} replace />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const roleHierarchy = {
    admin: ['admin'],
    colaborador: ['admin', 'colaborador'],
    recebedor: ['admin', 'colaborador', 'recebedor']
  };

  if (!roleHierarchy[requiredRole]?.includes(role)) {
    return (
      <Navigate 
        to="/unauthorized" 
        replace 
        state={{ 
          requiredRole, 
          currentRole: role 
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;