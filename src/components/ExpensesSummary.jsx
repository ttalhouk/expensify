import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

import selectExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/expense-total';

export const ExpensesSummary = ({expenses}) => {
  return(
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>You are viewing <span>{expenses.length}</span> {expenses.length === 1 ? 'expense' : 'expenses'} totaling <span>{numeral(totalExpenses(expenses) / 100).format('$0,0.00')}</span></h1>
        <div className="page-header__actions">          
          <Link to="/create" className="button">Create an Expense</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpensesSummary);
