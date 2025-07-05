import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay, startOfMonth, startOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Expense } from '../types/expense';
import { PeriodType } from './PeriodFilter';

interface ExpenseBarChartProps {
  expenses: Expense[];
  periodType: PeriodType;
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ expenses, periodType }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const groupExpensesByPeriod = () => {
    const grouped: { [key: string]: number } = {};

    expenses.forEach(expense => {
      const date = parseISO(expense.createdAt);
      let key: string;

      switch (periodType) {
        case 'day':
          key = format(startOfDay(date), 'dd/MM/yyyy', { locale: ptBR });
          break;
        case 'month':
          key = format(startOfMonth(date), 'MMMM yyyy', { locale: ptBR });
          break;
        case 'year':
          key = format(startOfYear(date), 'yyyy', { locale: ptBR });
          break;
        default:
          key = format(startOfDay(date), 'dd/MM/yyyy', { locale: ptBR });
      }

      grouped[key] = (grouped[key] || 0) + expense.amount;
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => {
        if (periodType === 'day') {
          return new Date(a.name.split('/').reverse().join('-')).getTime() - 
                 new Date(b.name.split('/').reverse().join('-')).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  };

  const data = groupExpensesByPeriod();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-indigo-600 font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Despesas por {periodType === 'day' ? 'Dia' : periodType === 'month' ? 'Mês' : 'Ano'}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]}
              stroke="#4f46e5"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBarChart; 