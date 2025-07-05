import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, parseISO, startOfDay, startOfMonth, startOfYear, eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Expense } from '../types/expense';
import { PeriodType } from './PeriodFilter';

interface ExpenseLineChartProps {
  expenses: Expense[];
  periodType: PeriodType;
  startDate: Date;
  endDate: Date;
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ expenses, periodType, startDate, endDate }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const generateDateRange = () => {
    let dates: Date[] = [];

    switch (periodType) {
      case 'day':
        dates = eachDayOfInterval({ start: startDate, end: endDate });
        break;
      case 'month':
        dates = eachMonthOfInterval({ start: startDate, end: endDate });
        break;
      case 'year':
        dates = eachYearOfInterval({ start: startDate, end: endDate });
        break;
      default:
        dates = eachDayOfInterval({ start: startDate, end: endDate });
    }

    return dates;
  };

  const groupExpensesByDate = () => {
    const dateRange = generateDateRange();
    const grouped: { [key: string]: number } = {};

    // Inicializar todas as datas com 0
    dateRange.forEach(date => {
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
      grouped[key] = 0;
    });

    // Adicionar valores das despesas
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

      if (grouped[key] !== undefined) {
        grouped[key] += expense.amount;
      }
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

  const data = groupExpensesByDate();

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
        Evolução das Despesas
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#6366f1" 
              fill="#6366f1" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseLineChart; 