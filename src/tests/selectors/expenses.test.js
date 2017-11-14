import getVisibleExpenses from '../../selectors/expenses';
import {expenses} from '../fixtures/expenses';

import moment from 'moment';

describe('getVisibleExpenses', () => {
  // const expenses = [
  //   {
  //     description: 'rent',
  //     amount: 50,
  //     createdAt: moment(0).add(4, 'days').valueOf()
  //   },
  //   {
  //     description: 'water bill',
  //     amount: 40,
  //     createdAt: 0
  //   },
  //   {
  //     description: 'gas bill',
  //     amount: 500,
  //     createdAt: moment(0).subtract(4, 'days').valueOf()
  //   }
  // ]
  it('should filter by text value', () => {
    const filter = {text: 'bill'};
    const result = getVisibleExpenses(expenses, filter);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[1],expenses[2]])
  });
  it('should filter by startDate value', () => {
    const filter = {text: '', startDate: moment(0)};
    const result = getVisibleExpenses(expenses, filter);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[0],expenses[1]])
  });
  it('should filter by endDate value', () => {
    const filter = {text: '', endDate: moment(0).subtract(1,'days')};
    const result = getVisibleExpenses(expenses, filter);
    expect(result.length).toBe(1);
    expect(result).toEqual([expenses[2]]);
  });
  it('should sort by amount', () => {
    const filter = {text: '', sortBy:'amount'};
    const result = getVisibleExpenses(expenses, filter);
    expect(result[0]).toEqual(expenses[2]);
    expect(result[1]).toEqual(expenses[0]);
    expect(result[2]).toEqual(expenses[1]);
  });
  it('should sort by date', () => {
    const filter = {text: '', sortBy:'date'};
    const result = getVisibleExpenses(expenses, filter);
    expect(result[0]).toEqual(expenses[0]);
    expect(result[1]).toEqual(expenses[1]);
    expect(result[2]).toEqual(expenses[2]);
  });
})
