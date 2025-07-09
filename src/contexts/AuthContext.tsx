import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isTokenExpired } from '../utils/jwt';
import { User, UserRole } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isRestaurantOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carregar dados de autenticação do localStorage ao inicializar
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        // Verificar se o token não expirou
        if (isTokenExpired(savedToken)) {
          console.log('Token expirado, fazendo logout...');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          return;
        }
        
        const userData = JSON.parse(savedUser);
        
        // Migração: se dados antigos não têm role, adicionar role padrãoq
        if (!userData.role) {
          userData.role = UserRole.CUSTOMER;
        }
        
        setToken(savedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        // Limpar dados corrompidos
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    // Salvar no localStorage
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Limpar localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Função para verificar se o usuário tem um role específico
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  // Propriedades computadas para facilitar verificações
  const isAdmin = hasRole(UserRole.ADMIN);
  const isCustomer = hasRole(UserRole.CUSTOMER);
  const isRestaurantOwner = hasRole(UserRole.RESTAURANT_OWNER);

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin,
    isCustomer,
    isRestaurantOwner,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 