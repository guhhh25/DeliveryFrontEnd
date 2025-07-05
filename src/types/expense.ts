export interface Expense {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface CreateExpenseData {
  description: string;
  amount: number;
}

export interface UpdateExpenseData {
  description: string;
  amount: number;
} 