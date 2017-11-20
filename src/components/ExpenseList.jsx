import React from 'react';
import {connect} from 'react-redux';

import selectExpenses from '../selectors/expenses';

import ExpenseListItem from './ExpenseListItem.jsx';

export const ExpenseList = (props) => {
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">
          Expenses
        </div>
        <div className="show-for-desktop">
          Expense
        </div>
        <div className="show-for-desktop">
          Amount
        </div>
      </div>
      <div className="list-body">
        {
          props.expenses.length === 0 ? (<p className="list-item--message">Add an expense to get started</p>): (
            props.expenses.map((expense) => {
              return <ExpenseListItem key={expense.id} expense={expense} />
            })
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList);
