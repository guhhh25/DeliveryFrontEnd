import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles, 
  fallback = <div>Você não tem permissão para acessar esta página.</div> 
}) => {
  const { user, isAuthenticated } = useAuth();

  // Se não estiver autenticado, mostrar fallback
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Se o usuário não tiver um dos roles permitidos, mostrar fallback
  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  // Se tiver permissão, mostrar o conteúdo
  return <>{children}</>;
};

export default RoleBasedRoute; 