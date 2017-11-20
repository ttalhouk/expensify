import React from 'react';
import {connect} from 'react-redux';

import {startEditExpense, startRemoveExpense} from '../actions/expenses';

import ExpenseForm from './ExpenseForm.jsx';


export class EditExpensePage extends React.Component {

  onSubmitUpdates = (updates) => {
    this.props.startEditExpense(this.props.expense.id, updates);
    this.props.history.push('/');
  }
  onRemoveExpense = () => {
    this.props.startRemoveExpense({id: this.props.expense.id});
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense <span>{this.props.expense.description}</span></h1>
          </div>
        </div>
          <div className="content-container">
            <ExpenseForm
              expense={this.props.expense}
              onSubmit={this.onSubmitUpdates}
              />
            <button
              className="button button--remove"
              onClick={this.onRemoveExpense}
              >
              Remove Expense
            </button>
          </div>

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
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
    startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
