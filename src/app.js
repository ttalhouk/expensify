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

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
