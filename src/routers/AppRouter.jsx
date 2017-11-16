import React from 'react';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.jsx';
import AddExpensePage from '../components/AddExpensePage.jsx';
import EditExpensePage from '../components/EditExpensePage.jsx';
import HelpPage from '../components/HelpPage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import Header from '../components/Header.jsx';
import LoginPage from '../components/LoginPage.jsx';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={LoginPage} />
        <Route path="/dashboard" component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
