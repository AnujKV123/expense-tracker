
export interface Expense {
  id: string;
  amount: number;
  category: 'Rental' | 'Groceries' | 'Entertainment' | 'Travel' | 'Others';
  notes?: string;
  date: string;
  paymentMode: 'UPI' | 'Credit Card' | 'Net Banking' | 'Cash';
  createdAt: string;
}

export interface ExpenseFilters {
  dateRange: 'thisMonth' | 'last30Days' | 'last90Days' | 'allTime';
  categories: string[];
  paymentModes: string[];
}
