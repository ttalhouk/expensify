import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as filterActions from '../actions/filters'

import {DateRangePicker} from 'react-dates';

export class ExpenseListFilters extends React.Component {
  state = {
    focusedInput: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }
  onFocusChange = (focusedInput) => {
    this.setState(() => ({ focusedInput }));
  }
  onTextChange = (e) =>  {
    this.props.setTextFilter(e.target.value);
  }
  onSelectChange = (e) => {
    if (e.target.value === 'date'){
      this.props.sortByDate();
    } else if(e.target.value === 'amount'){
      this.props.sortByAmount();
    }
  }
  render(){
    return (
      <div>
        <input
          type='text'
          value={this.props.filters.text}
          onChange={this.onTextChange}
          />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSelectChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => {return false}}
          showClearDates={true}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps, filterActions)(ExpenseListFilters);
