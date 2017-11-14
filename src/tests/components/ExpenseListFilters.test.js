import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseListFilters} from '../../components/ExpenseListFilters.jsx';
import {filters, defaultFilters} from '../fixtures/filters';


describe('<ExpenseListFilters />', () => {
  let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
  beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
      <ExpenseListFilters
        filters={defaultFilters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    )
  })
  it('should render the filters component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with alternate filter data correctly', () => {
    wrapper.setProps({filters: filters})
    expect(wrapper).toMatchSnapshot();
  });
  it('should update the text filter when changed', () => {
    const value = 'new'
    const input = wrapper.find('input');
    input.simulate('change', {target: {value}});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
  });
  it('should update the sortBy filter to "amount" when changed', () => {
    const value = 'amount'
    const select = wrapper.find('select');
    select.simulate('change', {target: {value}});
    expect(sortByAmount).toHaveBeenCalled();
  });
  it('should update the sortBy filter to "date" when changed', () => {
    wrapper.setProps({filters: filters});
    const value = 'date'
    const select = wrapper.find('select');
    select.simulate('change', {target: {value}});
    expect(sortByDate).toHaveBeenCalled();
  });

  it('should call setStartDate if input start date changed', () => {
    wrapper.setProps({filters: filters});
    const value = 1
    const picker = wrapper.find('DateRangePicker');
    picker.prop('onDatesChange')({startDate: value})
    expect(setStartDate).toHaveBeenLastCalledWith(value);
  });
  it('should call setEndDate if input end date changed', () => {
    wrapper.setProps({filters: filters});
    const value = 5
    const picker = wrapper.find('DateRangePicker');
    picker.prop('onDatesChange')({endDate: value})
    expect(setEndDate).toHaveBeenLastCalledWith(value);
  });
  it('should handle date picker focus changes', () => {
    const focusedInput = 'endDate';
    const picker = wrapper.find('DateRangePicker');
    picker.prop('onFocusChange')(focusedInput);
    expect(wrapper.state().focusedInput).toBe(focusedInput);
  });
})
