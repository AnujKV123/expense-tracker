
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { IndianRupee, PlusCircle, List, BarChart3 } from 'lucide-react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Analytics from '@/components/Analytics';
import UserAvatar from '@/components/UserAvatar';
import { Expense } from '@/types/expense';
import { saveExpenseToSupabase, loadExpensesFromSupabase } from '@/utils/supabaseStorage';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState('add');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const loadedExpenses = await loadExpensesFromSupabase();
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
      toast({
        title: "Error loading expenses",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      const newExpense = await saveExpenseToSupabase(expenseData);
      setExpenses(prev => [newExpense, ...prev]);
      setActiveTab('list');
      toast({
        title: "Expense added successfully!",
        description: `₹${expenseData.amount} for ${expenseData.category}`,
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error adding expense",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <IndianRupee className="h-12 w-12 text-emerald-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative mb-8">
          {/* User Avatar - Fixed in top-right */}
          <div className="absolute top-0 right-0 z-10">
            <UserAvatar />
          </div>
          
          {/* Main Header Content - Centered */}
          <div className="text-center pr-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-emerald-600 rounded-full">
                <IndianRupee className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              Welcome back, {user?.user_metadata?.username || user?.email?.split('@')[0]}! Track your expenses with ease.
            </p>
            {expenses.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
                <span className="text-sm text-gray-600">Total Expenses:</span>
                <span className="text-xl font-bold text-emerald-600 flex items-center gap-1">
                  <IndianRupee className="h-5 w-5" />
                  {totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white shadow-lg">
              <TabsTrigger value="add" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Expense
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                View List ({expenses.length})
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="add" className="space-y-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <IndianRupee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses yet</h3>
                <p className="text-gray-500 mb-6">Start by adding your first expense</p>
                <Button 
                  onClick={() => setActiveTab('add')}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Expense
                </Button>
              </div>
            ) : (
              <ExpenseList expenses={expenses} />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No data to analyze</h3>
                <p className="text-gray-500 mb-6">Add some expenses to see analytics</p>
                <Button 
                  onClick={() => setActiveTab('add')}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Expense
                </Button>
              </div>
            ) : (
              <Analytics expenses={expenses} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
