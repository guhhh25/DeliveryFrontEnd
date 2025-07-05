import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import PeriodFilter, { PeriodType } from './PeriodFilter';
import ExpenseBarChart from './ExpenseBarChart';
import ExpensePieChart from './ExpensePieChart';
import ExpenseLineChart from './ExpenseLineChart';

const DashboardPage: React.FC = () => {
  const { expenses, getExpensesByPeriod } = useExpenses();
  const [periodType, setPeriodType] = useState<PeriodType>('month');
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  });

  const filteredExpenses = getExpensesByPeriod(startDate, endDate);
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handlePeriodChange = (period: PeriodType) => {
    setPeriodType(period);
  };

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visualize suas despesas em gráficos e relatórios</p>
      </div>

      {/* Filtros de Período */}
      <PeriodFilter
        periodType={periodType}
        onPeriodChange={handlePeriodChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total no Período
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totalExpenses)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Quantidade
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {filteredExpenses.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Média por Despesa
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(averageExpense)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <ExpenseBarChart expenses={filteredExpenses} periodType={periodType} />
        
        {/* Gráfico de Pizza */}
        <ExpensePieChart expenses={filteredExpenses} />
      </div>

      {/* Gráfico de Linha (Largura Total) */}
      <div className="grid grid-cols-1 gap-6">
        <ExpenseLineChart 
          expenses={filteredExpenses} 
          periodType={periodType}
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      {/* Informações Adicionais */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumo do Período
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Maior Despesa</h4>
            {filteredExpenses.length > 0 ? (
              <div className="text-sm text-gray-600">
                <p className="font-medium">{filteredExpenses.reduce((max, exp) => exp.amount > max.amount ? exp : max).description}</p>
                <p className="text-indigo-600 font-semibold">
                  {formatCurrency(Math.max(...filteredExpenses.map(exp => exp.amount)))}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhuma despesa no período</p>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Menor Despesa</h4>
            {filteredExpenses.length > 0 ? (
              <div className="text-sm text-gray-600">
                <p className="font-medium">{filteredExpenses.reduce((min, exp) => exp.amount < min.amount ? exp : min).description}</p>
                <p className="text-green-600 font-semibold">
                  {formatCurrency(Math.min(...filteredExpenses.map(exp => exp.amount)))}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhuma despesa no período</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 