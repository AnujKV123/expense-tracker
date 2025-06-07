
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import { format, startOfMonth, subDays, subMonths } from 'date-fns';
import { Expense, ExpenseFilters } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
}

const categories = ['Rental', 'Groceries', 'Entertainment', 'Travel', 'Others'];
const paymentModes = ['UPI', 'Credit Card', 'Net Banking', 'Cash'];

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const [filters, setFilters] = useState<ExpenseFilters>({
    dateRange: 'allTime',
    categories: [],
    paymentModes: []
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Rental': 'bg-blue-100 text-blue-800',
      'Groceries': 'bg-green-100 text-green-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Travel': 'bg-orange-100 text-orange-800',
      'Others': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.Others;
  };

  const getPaymentModeColor = (mode: string) => {
    const colors = {
      'UPI': 'bg-emerald-100 text-emerald-800',
      'Credit Card': 'bg-red-100 text-red-800',
      'Net Banking': 'bg-blue-100 text-blue-800',
      'Cash': 'bg-yellow-100 text-yellow-800'
    };
    return colors[mode as keyof typeof colors] || colors.Cash;
  };

  const filterExpenses = () => {
    let filtered = [...expenses];

    // Date filtering
    const now = new Date();
    switch (filters.dateRange) {
      case 'thisMonth':
        const monthStart = startOfMonth(now);
        filtered = filtered.filter(expense => new Date(expense.date) >= monthStart);
        break;
      case 'last30Days':
        const thirtyDaysAgo = subDays(now, 30);
        filtered = filtered.filter(expense => new Date(expense.date) >= thirtyDaysAgo);
        break;
      case 'last90Days':
        const ninetyDaysAgo = subDays(now, 90);
        filtered = filtered.filter(expense => new Date(expense.date) >= ninetyDaysAgo);
        break;
      default:
        break;
    }

    // Category filtering
    if (filters.categories.length > 0) {
      filtered = filtered.filter(expense => filters.categories.includes(expense.category));
    }

    // Payment mode filtering
    if (filters.paymentModes.length > 0) {
      filtered = filtered.filter(expense => filters.paymentModes.includes(expense.paymentMode));
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handlePaymentModeChange = (mode: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      paymentModes: checked 
        ? [...prev.paymentModes, mode]
        : prev.paymentModes.filter(m => m !== mode)
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: 'allTime',
      categories: [],
      paymentModes: []
    });
  };

  const filteredExpenses = filterExpenses();
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value as ExpenseFilters['dateRange'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allTime">All Time</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="last30Days">Last 30 Days</SelectItem>
                  <SelectItem value="last90Days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categories</label>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                    />
                    <label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Modes</label>
              <div className="space-y-2">
                {paymentModes.map(mode => (
                  <div key={mode} className="flex items-center space-x-2">
                    <Checkbox
                      id={`payment-${mode}`}
                      checked={filters.paymentModes.includes(mode)}
                      onCheckedChange={(checked) => handlePaymentModeChange(mode, !!checked)}
                    />
                    <label htmlFor={`payment-${mode}`} className="text-sm">
                      {mode}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <div className="text-lg font-semibold flex items-center gap-1">
              Total: <IndianRupee className="h-4 w-4" />
              {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No expenses found matching your filters.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                        <Badge className={getCategoryColor(expense.category)}>
                          {expense.category}
                        </Badge>
                        <Badge variant="outline" className={getPaymentModeColor(expense.paymentMode)}>
                          {expense.paymentMode}
                        </Badge>
                      </div>
                      {expense.notes && (
                        <p className="text-sm text-muted-foreground">{expense.notes}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseList;
