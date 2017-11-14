import expensesReducer from '../../reducers/expensesReducer';
import {expenses} from '../fixtures/expenses'

describe('expensesReducer', () => {
  it('should initialize to []',() => {
    const result = expensesReducer(undefined, {
      type: '@@INIT'
    });
    expect(result).toEqual([]);
  });
  it('should add expense to state when add expense action called', () => {
    const expense = {
      description: 'test 1',
      amount: 5000,
      note: '',
      createdAt: 0
    };
    const state = expensesReducer(undefined, {
      type: 'ADD_EXPENSE',
      expense
    });
    expect(state).toEqual([expense])
  });
  it('should remove expense by id when action is called', () => {
    const id = expenses[0].id;
    const initialState = expenses;
    const state = expensesReducer(initialState, {
      type: 'REMOVE_EXPENSE',
      id
    });
    expect(state.length).toBe(2);
    expect(state).toEqual([initialState[1], initialState[2]]);
  });
  it('should not remove expense if id does not match when action is called', () => {
    const id = 'asdlkjsadljfsdjk';
    const initialState = expenses;
    const state = expensesReducer(initialState, {
      type: 'REMOVE_EXPENSE',
      id
    });
    expect(state.length).toBe(3);
    expect(state).toEqual(initialState);
  });
  it('should edit expense by id when edit action is called', () => {
    const id = expenses[0].id;
    const updates = { note: 'new note'}
    const initialState = expenses;
    const state = expensesReducer(initialState, {
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    expect(state[0].note).toBe(updates.note);
  });
  it('should not edit expense if id does not match when edit action is called', () => {
    const id = 'jsdalkjadsljljerjf';
    const updates = { note: 'new note'}
    const initialState = expenses;
    const state = expensesReducer(initialState, {
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    expect(state).toEqual(initialState);
  });
});
