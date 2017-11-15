import React from 'react';

import ExpensesSummary from './ExpensesSummary.jsx';
import ExpenseList from './ExpenseList.jsx';
import ExpenseListFilters from './ExpenseListFilters.jsx';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
)

export default ExpenseDashboardPage;
