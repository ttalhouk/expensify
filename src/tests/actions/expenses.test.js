import * as actions from '../../actions/expenses';


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
    const expense = {
      description: 'Test Expense 1',
      amount: 30,
      createdAt: 10,
      note: 'test note'
    }
    const result = actions.addExpense(expense);
    expect(result).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expense,
        id: expect.any(String)
      }
    });
  });
  it('should return the action generator for addExpense with default expense object', () => {
    const result = actions.addExpense();
    expect(result).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
        id: expect.any(String)}
    })
  })
})
