import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      focused: false,
      error: ''
    }
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => {
      return {description}
    });
  }
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => {
      return {note}
    });
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => {
        return {amount}
      });
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => {
        return {createdAt}
      });
    }
  }
  onCalenderFocus = ({focused}) => {
    this.setState(() => {
      return { focused }
    })
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => {
        return { error: 'Please update required fields'}
      })
    } else {
      this.setState(() => {
        return {error: ''}
      });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      })
    }
  }

  render () {
    return(
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Description:
            <input
              type='text'
              placeholder="Description"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              autoFocus
              />
          </label>
          <label>
            Amount:
            <input
              type='number'
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
              />
          </label>
          <label>
            Date:
            <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.focused}
              onFocusChange={this.onCalenderFocus}
              numberOfMonths={1}
              isOutsideRange={() => {return false}}
              />
          </label>
          <label>
            Note:
            <textarea
              placeholder="Add a note for your expense"
              value={this.state.note}
              onChange={this.onNoteChange}
              ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm;
