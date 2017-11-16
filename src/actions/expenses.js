import uuid from 'uuid';
import database from '../firebase/firebase';


export const addExpense = (expense) => {
  return {
    type: 'ADD_EXPENSE',
    expense
  };
}

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt
    }
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    }).catch((e) => {
      console.log(e);
    });
  };
};

export const removeExpense = ({id}) => {
  return {
    type:'REMOVE_EXPENSE',
    id
  }
}

export const startRemoveExpense = ({id}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}));
    }).catch((e) => {
      console.log(e);
    });
  };
};

export const editExpense = (id, updates) => {
  return (
    {
      type: 'EDIT_EXPENSE',
      id,
      updates
    }
  );
};
export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    }).catch((e) => {
      console.log(e);
    });
  };
};

export const setExpenses = (expenses) => {
  return {
    type: 'SET_EXPENSES',
    expenses
  }
}

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value')
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((expense) => {
            expenses.push({
              id: expense.key,
              ...expense.val()
            })
          });
        dispatch(setExpenses(expenses));
      }).catch((error) => {
        console.log(error);
      });
  }
}
