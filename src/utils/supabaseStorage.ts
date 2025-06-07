
import { supabase } from '@/integrations/supabase/client';
import { Expense } from '@/types/expense';

export const saveExpenseToSupabase = async (expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('expenses')
    .insert({
      user_id: user.id,
      amount: expense.amount,
      category: expense.category,
      notes: expense.notes,
      expense_date: expense.date,
      payment_mode: expense.paymentMode
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving expense:', error);
    throw error;
  }

  return {
    id: data.id,
    amount: data.amount,
    category: data.category as Expense['category'],
    notes: data.notes,
    date: data.expense_date,
    paymentMode: data.payment_mode as Expense['paymentMode'],
    createdAt: data.created_at
  };
};

export const loadExpensesFromSupabase = async (): Promise<Expense[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading expenses:', error);
    throw error;
  }

  return data.map(expense => ({
    id: expense.id,
    amount: expense.amount,
    category: expense.category as Expense['category'],
    notes: expense.notes,
    date: expense.expense_date,
    paymentMode: expense.payment_mode as Expense['paymentMode'],
    createdAt: expense.created_at
  }));
};

// export const deleteExpenseFromSupabase = async (id: string): Promise<void> => {
//   const { error } = await supabase
//     .from('expenses')
//     .delete()
//     .eq('id', id);

//   if (error) {
//     console.error('Error deleting expense:', error);
//     throw error;
//   }
// };
