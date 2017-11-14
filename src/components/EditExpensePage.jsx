import React from 'react';
import {connect} from 'react-redux';

import {editExpense, removeExpense} from '../actions/expenses';

import ExpenseForm from './ExpenseForm.jsx';


export class EditExpensePage extends React.Component {

  onSubmitUpdates = (updates) => {
    this.props.editExpense(this.props.expense.id, updates);
    this.props.history.push('/');
  }
  onRemoveExpense = () => {
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Edit Expense {this.props.expense.description}</h1>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmitUpdates}
          />
        <button
          onClick={this.onRemoveExpense}
          >
          Remove
        </button>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id
    })
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeExpense: (id) => dispatch(removeExpense(id)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
