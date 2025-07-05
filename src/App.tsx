import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import SuccessMessage from './components/SuccessMessage';
import Dashboard from './components/Dashboard';
import DeliveryHome from './components/DeliveryHome';
import { motion } from 'framer-motion';

type ViewType = 'delivery' | 'login' | 'register' | 'success';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('delivery');

  const handleLoginSuccess = () => {
    // O usuário será redirecionado automaticamente para o Dashboard
    // através do contexto de autenticação
  };

  const handleRegisterSuccess = () => {
    setCurrentView('success');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToDelivery = () => {
    setCurrentView('delivery');
  };

  // Se o usuário estiver autenticado, mostrar o Dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Caso contrário, mostrar as telas de autenticação ou delivery
  const renderCurrentView = () => {
    switch (currentView) {
      case 'delivery':
        return (
          <div className="relative">
            <DeliveryHome />
            {/* Botão de login flutuante */}
            <motion.button
              onClick={handleSwitchToLogin}
              className="fixed top-6 left-6 bg-white text-orange-600 px-4 py-2 rounded-full shadow-lg font-semibold z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar
            </motion.button>
          </div>
        );
      case 'login':
        return (
          <div className="relative">
            <Login
              onSwitchToRegister={handleSwitchToRegister}
              onLoginSuccess={handleLoginSuccess}
            />
            {/* Botão para voltar ao delivery */}
            <motion.button
              onClick={handleSwitchToDelivery}
              className="fixed top-6 left-6 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar
            </motion.button>
          </div>
        );
      case 'register':
        return (
          <div className="relative">
            <Register
              onSwitchToLogin={handleSwitchToLogin}
              onRegisterSuccess={handleRegisterSuccess}
            />
            {/* Botão para voltar ao delivery */}
            <motion.button
              onClick={handleSwitchToDelivery}
              className="fixed top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar
            </motion.button>
          </div>
        );
      case 'success':
        return (
          <div className="relative">
            <SuccessMessage
              message="Conta criada com sucesso! Agora você pode fazer login."
              onAction={handleSwitchToLogin}
              actionText="Ir para o Login"
            />
            {/* Botão para voltar ao delivery */}
            <motion.button
              onClick={handleSwitchToDelivery}
              className="fixed top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar
            </motion.button>
          </div>
        );
      default:
        return (
          <div className="relative">
            <DeliveryHome />
            <motion.button
              onClick={handleSwitchToLogin}
              className="fixed top-6 left-6 bg-white text-orange-600 px-4 py-2 rounded-full shadow-lg font-semibold z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar
            </motion.button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
