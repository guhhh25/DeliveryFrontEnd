import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Expense } from '../types/expense';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  deleteExpense: (id: string) => void;
  getExpensesByPeriod: (startDate: Date, endDate: Date) => Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    // Dados de exemplo - em uma aplicação real viriam da API
    {
      id: '1',
      description: 'Aluguel',
      amount: 1200.00,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      description: 'Conta de luz',
      amount: 150.50,
      createdAt: '2024-01-10T14:30:00Z'
    },
    {
      id: '3',
      description: 'Supermercado',
      amount: 350.75,
      createdAt: '2024-01-08T09:15:00Z'
    },
    {
      id: '4',
      description: 'Internet',
      amount: 89.90,
      createdAt: '2024-01-05T16:20:00Z'
    },
    {
      id: '5',
      description: 'Combustível',
      amount: 200.00,
      createdAt: '2024-01-03T11:45:00Z'
    },
    {
      id: '6',
      description: 'Farmácia',
      amount: 85.30,
      createdAt: '2024-01-02T08:30:00Z'
    },
    {
      id: '7',
      description: 'Restaurante',
      amount: 120.00,
      createdAt: '2024-01-01T19:15:00Z'
    },
    {
      id: '8',
      description: 'Academia',
      amount: 80.00,
      createdAt: '2023-12-28T10:00:00Z'
    },
    {
      id: '9',
      description: 'Netflix',
      amount: 39.90,
      createdAt: '2023-12-25T14:30:00Z'
    },
    {
      id: '10',
      description: 'Presente',
      amount: 250.00,
      createdAt: '2023-12-20T16:45:00Z'
    }
  ]);

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: expenseData.description,
      amount: expenseData.amount,
      createdAt: new Date().toISOString()
    };

    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id 
        ? { ...expense, description: expenseData.description, amount: expenseData.amount }
        : expense
    ));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getExpensesByPeriod = (startDate: Date, endDate: Date) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByPeriod
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}; 