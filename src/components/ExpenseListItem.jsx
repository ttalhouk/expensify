import React from 'react';
import {Link} from 'react-router-dom';
import * as expenseActions from '../actions/expenses'

const ExpenseListItem = (props) => {
  return (
    <div>
      <Link to={`/edit/${props.expense.id}`}>
        <h3>{props.expense.description}</h3>
      </Link>
      <p>{props.expense.amount} pennies / created at: {props.expense.createdAt}</p>

    </div>
  )
}

export default ExpenseListItem;
