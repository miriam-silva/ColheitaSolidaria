import { Navigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuthentication from '../hooks/useAuthentication';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading, error } = useAuthentication();
  const location = useLocation();

  useEffect(() => {
    const handleInvalidRole = async () => {
      if (user && !loading && !role) {
        console.warn("Usuário autenticado, mas sem role — deslogando...");
        const auth = getAuth();
        await new Promise(resolve => setTimeout(resolve, 200));
        await signOut(auth);
        toast.success("Logout automático: acesso inválido ou sem permissão.");
      }
    };
    handleInvalidRole();
  }, [user, role, loading]);
  

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
    colaborador: ['colaborador'],
    recebedor: ['recebedor']
  };  

  const allowedRoles = roleHierarchy[requiredRole] || [];

  if (!allowedRoles.includes(role)) {
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
