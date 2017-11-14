import React from 'react';
import {connect} from 'react-redux';

import selectExpenses from '../selectors/expenses';

import ExpenseListItem from './ExpenseListItem.jsx';

export const ExpenseList = (props) => {
  return (
    <div>
      {
        props.expenses.length === 0 ? (<p>Add an expense to get started</p>): (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} expense={expense} />
          })
        )
      }
      {}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList);
