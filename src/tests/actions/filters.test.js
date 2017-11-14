import * as actions from '../../actions/filters';
import moment from 'moment';

describe('Filters Action Generators', () => {
  it('should return action with text property when setTextFilter is called', () => {
    const text = 'test';
    const result = actions.setTextFilter(text);
    expect(result).toEqual({
      type: 'SET_TEXT_FILTER',
      text
    });
  });
  it('should return action with default text property when setTextFilter is called', () => {
    const result = actions.setTextFilter();
    expect(result).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    });
  });
  it('should return action to sort by date when sortByDate is called', () => {
    const result = actions.sortByDate();
    expect(result).toEqual({
      type: 'SORT_BY_DATE'
    });
  });
  it('should return action to sort by amount when sortByAmount is called', () => {
    const result = actions.sortByAmount();
    expect(result).toEqual({
      type: 'SORT_BY_AMOUNT'
    });
  });
  it('should return action to set start date when setStartDate is called with date', () => {
    const date = moment();
    const result = actions.setStartDate(date);
    expect(result).toEqual({
      type: 'SET_START_DATE',
      date
    });
  });
  it('should return action to set end date when setEndDate is called with date', () => {
    const date = moment();
    const result = actions.setEndDate(date);
    expect(result).toEqual({
      type: 'SET_END_DATE',
      date
    });
  });

})
