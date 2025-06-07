
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, BarChart3, Filter, Shield, Calendar, CreditCard } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-emerald-600 rounded-full">
              <IndianRupee className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take control of your finances with our intuitive expense tracking application. 
            Monitor your spending, analyze patterns, and make informed financial decisions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Easy Expense Input</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Quickly add expenses with amount, category, date, and payment mode. 
                Simple form with all the essential fields you need.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Powerful Filtering</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Filter your expenses by date range, category, and payment mode. 
                Find exactly what you're looking for with advanced search options.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Insightful Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualize your spending patterns with interactive charts. 
                See monthly breakdowns by category to understand your habits.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your financial data is protected with bank-level security. 
                Only you can access your expense information.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Multiple Payment Modes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track expenses across UPI, Credit Card, Net Banking, and Cash. 
                Get a complete picture of your spending across all channels.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Indian Rupees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built specifically for Indian users with INR currency support 
                and payment modes popular in India.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your Expenses?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of users who are already tracking their expenses efficiently.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
          >
            Start Tracking Now - It's Free!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
