import * as actions from '../../actions/expenses';
import {expenses} from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


describe('Action generators for expense', () => {
  it('should return remove expense generator with the id', () => {
    const id = 1
    const result = actions.removeExpense({id});
    expect(result).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
  });
  it('should call edit expense generator with the id and updates', () => {
    const id = 1
    const updates = {
      description: 'Test Update Expense 1',
      amount: 30
    }
    const result = actions.editExpense(id, updates);
    expect(result).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
  });

  it('should return the action generator for addExpense with expense object', () => {
    const expense = expenses[0]
    const result = actions.addExpense(expense);
    expect(result).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expense,
        id: expect.any(String)
      }
    });
  });

  it('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
      description: "Test expense",
      amount: 500,
      note: "test note",
      createdAt: 202002022002
    }
    store.dispatch(actions.startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });

  });
  it('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultExpense = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    };
    store.dispatch(actions.startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(
        {
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...defaultExpense
          }
        }
      );
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpense);
        done();
      });
  });
  // it('should return the action generator for addExpense with default expense object', () => {
  //   const result = actions.addExpense();
  //   expect(result).toEqual({
  //     type: 'ADD_EXPENSE',
  //     expense: {
  //       description: '',
  //       note: '',
  //       amount: 0,
  //       createdAt: 0,
  //       id: expect.any(String)}
  //   });
  // });
})
