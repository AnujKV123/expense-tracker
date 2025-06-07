# 💰 Expense Tracker

A minimal and functional web application to track your expenses. Built with React (frontend) and Supabase (backend). Deployed using Supabase or similar platforms.

## 🚀 Features

### ➕ Add Expenses
Add new expenses with the following details:
- **Amount (₹)**: Numeric value of the expense.
- **Category**: Choose from one of the following:
  - Rental
  - Groceries
  - Entertainment
  - Travel
  - Others
- **Notes**: Optional one-line description.
- **Date**: Date of the expense.
- **Payment Mode**: Choose from:
  - UPI
  - Credit Card
  - Net Banking
  - Cash

### 📋 View Expenses
- View a list of all added expenses.
- Apply filters to narrow down results:
  - **Date Range**: 
    - This Month
    - Last 30 Days
    - Last 90 Days
    - All Time
  - **Category**: Select one or multiple categories.
  - **Payment Mode**: Select one or multiple modes.

### 📊 Analytics
- Visualize your spending through a **stacked bar chart**:
  - **X-Axis**: Month
  - **Y-Axis**: Amount (₹)
  - **Bar Colors**: Represent different categories.

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | React / Vite, ShadCN UI|
| Backend     | Supabase               |
| Database    | Supabase / PostgreSQL  |
| Charting    | Chart.js / Recharts    |
| Deployment  | Supabase / Netlify     |

## 📦 Installation

1. Clone the Repository

    ```bash
    git clone https://github.com/AnujKV123/expense-tracker.git
    cd expense-tracker

2. Install dependencies

    ```bash
    npm install

3. Setup the Environment Variables

    ```bash
    touch .env

4. Add the following inside .env:

    ```bash
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY

5. Run the development server

    ```bash
    npm run dev

6. The app will start at:

    ```bash
    http://localhost:8080