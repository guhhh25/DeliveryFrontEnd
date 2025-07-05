import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Expense } from '../types/expense';

interface ExpensePieChartProps {
  expenses: Expense[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ expenses }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Cores para as categorias
  const COLORS = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
    '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#a855f7'
  ];

  const groupExpensesByCategory = () => {
    const grouped: { [key: string]: number } = {};

    expenses.forEach(expense => {
      // Simulando categorias baseadas na descrição
      let category = 'Outros';
      
      const description = expense.description.toLowerCase();
      if (description.includes('aluguel') || description.includes('moradia')) {
        category = 'Moradia';
      } else if (description.includes('luz') || description.includes('energia') || 
                 description.includes('água') || description.includes('internet') ||
                 description.includes('gás')) {
        category = 'Contas';
      } else if (description.includes('supermercado') || description.includes('comida') ||
                 description.includes('restaurante')) {
        category = 'Alimentação';
      } else if (description.includes('combustível') || description.includes('gasolina') ||
                 description.includes('uber') || description.includes('transporte')) {
        category = 'Transporte';
      } else if (description.includes('farmácia') || description.includes('medicamento')) {
        category = 'Saúde';
      } else if (description.includes('academia') || description.includes('esporte')) {
        category = 'Lazer';
      } else if (description.includes('presente') || description.includes('shopping')) {
        category = 'Compras';
      }

      grouped[category] = (grouped[category] || 0) + expense.amount;
    });

    return Object.entries(grouped)
      .map(([name, value], index) => ({ 
        name, 
        value,
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
  };

  const data = groupExpensesByCategory();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-indigo-600 font-semibold">
            {formatCurrency(data.value)}
          </p>
          <p className="text-gray-600 text-sm">
            {percentage}% do total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Despesas por Categoria
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart; 