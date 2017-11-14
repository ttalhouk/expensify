import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Actions

const addExpense = ({description = '', notes = '', amount = 0, createdAt = 0} = {}) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      notes,
      amount,
      createdAt
    }
  }
}
const removeExpense = ({id}) => {
  return {
    type:'REMOVE_EXPENSE',
    id
  }
}
const editExpense = (id, updates) => {
  return (
    {
      type: 'EDIT_EXPENSE',
      id,
      updates
    }
  )
}

const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
}

const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  }
}

const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  }
}

const setStartDate = (date) => {
  return {
    type: 'SET_START_DATE',
    date
  }
}
const setEndDate = (date) => {
  return {
    type: 'SET_END_DATE',
    date
  }
}


// expenses reducer

const expenseInitialState = []

const expensesReducer = (state = expenseInitialState, action) => {
  switch (action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => {
        if (expense.id !== action.id){
          return expense
        }
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {...expense, ...action.updates}
        }
        return expense
      })
    default:
      return state;
  }
}

// filters reducer

const filtersInitialState = {
  text: '',
  sortBy:'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type){
    case 'SET_TEXT_FILTER':
      return {...state, text: action.text};
    case 'SORT_BY_AMOUNT':
      return {...state, sortBy: 'amount'};
    case 'SORT_BY_DATE':
      return {...state, sortBy: 'date'};
    case 'SET_START_DATE':
      return {...state, startDate: action.date};
    case 'SET_END_DATE':
      return {...state, endDate: action.date};
    default:
      return state;
  }
}

// combine reducer

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

// Get Visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return textMatch && startDateMatch && endDateMatch;
  }).sort((exp1, exp2) => {
    if (sortBy === 'date') {
      return exp1.createdAt - exp2.createdAt;
    } else if (sortBy === 'amount'){
      return exp1.amount - exp2.amount;
    }
  })
}

// subscribe to changes

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});


const exp1 = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 2000}));
const exp2 = store.dispatch(addExpense({description: 'Entertainment', amount: 500, createdAt: 500}));
const exp3 = store.dispatch(addExpense({description: 'Food', amount: 1500, createdAt: 200}));

// store.dispatch(removeExpense({id: exp1.expense.id}));
//
// store.dispatch(editExpense(exp2.expense.id, {amount: 50000}));
//
// store.dispatch(setTextFilter('FOO'));
//
store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setEndDate(1250));



const demoState = {
  expenses: [{
    id: 'sfdsf',
    description: 'rent example',
    notes: 'final payment',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}
