import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    { id: 'restaurants', name: 'Restaurantes', icon: '🍕' },
    { id: 'orders', name: 'Pedidos', icon: '📦' },
    { id: 'users', name: 'Usuários', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <span className="text-2xl">🍕</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Restaurantes</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pedidos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Receita Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 8.450</p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'restaurants':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Gerenciar Restaurantes</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Pizza Express</h4>
                  <p className="text-sm text-gray-600">Status: Ativo</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Editar</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Desativar</button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Burger House</h4>
                  <p className="text-sm text-gray-600">Status: Ativo</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Editar</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Desativar</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Pedidos Recentes</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Pedido #1234</h4>
                  <p className="text-sm text-gray-600">Pizza Margherita - Pizza Express</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Entregue</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Pedido #1235</h4>
                  <p className="text-sm text-gray-600">X-Burger - Burger House</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Em Preparo</span>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Usuários do Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">João Silva</h4>
                  <p className="text-sm text-gray-600">joao@email.com - Cliente</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Ver Detalhes</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Bloquear</button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maria Santos</h4>
                  <p className="text-sm text-gray-600">maria@email.com - Proprietária</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Ver Detalhes</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Bloquear</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Vendas por Mês</h4>
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Gráfico de Vendas</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Produtos Mais Vendidos</h4>
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Gráfico de Produtos</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Selecione uma aba</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
            </div>
            <div className="text-sm text-gray-700">
              Admin: <span className="font-medium">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard; 