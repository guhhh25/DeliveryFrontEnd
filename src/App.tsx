import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import SuccessMessage from './components/SuccessMessage';
import AdminDashboard from './components/AdminDashboard';
import DeliveryHome from './components/DeliveryHome';
import EmpresaPage from './components/EmpresaPage';
import HamburgerMenu from './components/HamburgerMenu';

// Layout com menu lateral
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HamburgerMenu />
      <main className="pt-8">
        <Outlet />
      </main>
    </div>
  );
};

// Rota protegida
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/index" replace />
            : <Login onSwitchToRegister={() => window.location.href = '/register'} />
        }
      />
      <Route path="/register" element={<Register onSwitchToLogin={() => window.location.href = '/login'} onRegisterSuccess={() => window.location.href = '/login'} />} />
      <Route path="/success" element={<SuccessMessage message="Conta criada com sucesso! Agora você pode fazer login." onAction={() => window.location.href = '/login'} actionText="Ir para o Login" />} />
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/index" element={<div />} />
        <Route path="/empresa" element={<EmpresaPage />} />
        <Route path="/loja" element={<DeliveryHome />} />
        <Route path="/pedidos" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Pedidos</h1><p>Funcionalidade em desenvolvimento</p></div>} />
        <Route path="/produtos" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Produtos</h1><p>Funcionalidade em desenvolvimento</p></div>} />
        <Route path="/relatorios" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Relatórios</h1><p>Funcionalidade em desenvolvimento</p></div>} />
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        <Route path="/" element={<Navigate to="/index" replace />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? "/index" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
