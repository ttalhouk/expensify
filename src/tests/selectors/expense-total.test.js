import getTotalExpenses from '../../selectors/expense-total';
import {expenses} from '../fixtures/expenses';

describe('Total-Expenses selector', () => {
  it('should return 0 if no expenses are given', () => {
    expect(getTotalExpenses()).toBe(0);
  });
  it('should return the sum total amounts of the given expenses', () => {
    expect(getTotalExpenses(expenses)).toBe(590);
  });
  it('should return the amount if given 1 expense', () => {
    expect(getTotalExpenses([expenses[0]])).toBe(50);
  });
})
