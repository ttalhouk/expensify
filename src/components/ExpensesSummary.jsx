import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import numeral from 'numeral'

import selectExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/expense-total';

export const ExpensesSummary = ({expenses}) => {
  return(
    <div>
      <h3>You are viewing {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} totaling {numeral(totalExpenses(expenses) / 100).format('$0,0.00')}</h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpensesSummary);
