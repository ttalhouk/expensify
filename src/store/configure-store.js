import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expensesReducer';
import filtersReducer from '../reducers/filtersReducer';
import authReducer from '../reducers/auth';

const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer
  }), composeMiddleware(applyMiddleware(thunk)));

  return store;
}
