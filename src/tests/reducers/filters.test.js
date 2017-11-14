import filtersReducer from '../../reducers/filtersReducer';
import moment from 'moment';

describe('filtersReducer', () => {
  it('should setup default state for filters', () => {
    const state = filtersReducer(undefined,{
      type: '@@INIT'
    });
    expect(state).toEqual({
      text: '',
      sortBy:'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    });
  });
  it('should set sortBy property to amount when sort by amount action dispatched', () => {
    const state = filtersReducer(undefined,{
      type: 'SORT_BY_AMOUNT'
    });
    expect(state.sortBy).toBe('amount');
  });
  it('should set sortBy property to date when sort by date action dispatched', () => {
    const state = filtersReducer({
      text: '',
      sortBy:'amount',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    },{
      type: 'SORT_BY_DATE'
    });
    expect(state.sortBy).toBe('date');
  });
  it('should set text property given text when set text filter dispatched', () => {
    const text = 'test';
    const state = filtersReducer(undefined,{
      type: 'SET_TEXT_FILTER',
      text
    });
    expect(state.text).toBe(text);
  });
  it('should set startDate property to given date when set start date dispatched', () => {
    const date = moment();
    const state = filtersReducer(undefined,{
      type: 'SET_START_DATE',
      date: date
    });
    expect(state.startDate).toEqual(date);
  });
  it('should set endDate property to given date when set end date dispatched', () => {
    const date = moment();
    const state = filtersReducer(undefined,{
      type: 'SET_END_DATE',
      date: date
    });
    expect(state.endDate).toEqual(date);
  });
})
