import React from 'react';
import RoleBasedRoute from './RoleBasedRoute';
import { UserRole } from '../types/auth';

interface AdminOnlyComponentProps {
  children: React.ReactNode;
}

const AdminOnlyComponent: React.FC<AdminOnlyComponentProps> = ({ children }) => {
  return (
    <RoleBasedRoute 
      allowedRoles={[UserRole.ADMIN]}
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso Negado
            </h2>
            <p className="text-gray-600">
              Você não tem permissão para acessar esta área.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </RoleBasedRoute>
  );
};

export default AdminOnlyComponent; 