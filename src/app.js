import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';

import configureStore from './store/configure-store'

import AppRouter from './routers/AppRouter.jsx';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import * as expenseActions from './actions/expenses';
import * as filterActions from './actions/filters';
import getVisibleExpenses from './selectors/expenses'

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState()
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log(visibleExpenses);
// })
//
store.dispatch(expenseActions.addExpense({description:"Gas Bill", amount: 5000, createdAt: Date.now()}));
store.dispatch(expenseActions.addExpense({description:"Water Bill", amount: 2000, createdAt: Date.now()}));
store.dispatch(expenseActions.addExpense({description:"Rent", amount: 30000, createdAt: Date.now()}));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
