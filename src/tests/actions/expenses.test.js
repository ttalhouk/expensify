import * as actions from '../../actions/expenses';
import {expenses} from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


describe('Action generators for expense', () => {
  beforeEach((done) => {
    const expensesData = {};
    expenses.forEach((expense) => {
      expensesData[expense.id] = {
        description: expense.description,
        amount: expense.amount,
        note: expense.note,
        createdAt: expense.createdAt
      }
    })

    database.ref('expenses').set(expensesData).then(() => done());
  })
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
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`expenses/${storeActions[0].expense.id}`).once('value');
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
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual(
        {
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...defaultExpense
          }
        }
      );
      return database.ref(`expenses/${storeActions[0].expense.id}`).once('value');
    })
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpense);
        done();
      });
  });

  it('should return the action generator for setExpense with expense objects array', () => {
    const action = actions.setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
  });

  it('should fetch data from database and call setExpense on startSetExpenses', (done) => {
    const store = createMockStore({});
    store.dispatch(actions.startSetExpenses()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
  });
  it('should remove data by id from database and call removeExpense on startRemoveExpenses', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id
    store.dispatch(actions.startRemoveExpense({id})).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
  });
  it('should update data by id and updates in database and call editExpense on startEditExpenses', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id;
    const updates = {description: 'new test description'}
    store.dispatch(actions.startEditExpense(id, updates)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
      const {description, note, amount, createdAt} = expenses[1]
      const updatedExpense = {
        description,
        note,
        amount,
        createdAt,
        ...updates
      }
      expect(snapshot.val()).toEqual(updatedExpense);
      done();
    });
  });

});
