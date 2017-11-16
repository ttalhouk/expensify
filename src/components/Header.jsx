import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

import { startLogout } from '../actions/auth';

export const Header = (props) => {
  return(
    <header>
      <h1>Expensify</h1>
      <NavLink to='/dashboard' activeClassName="is-active">Home</NavLink>
      <NavLink to='/create' activeClassName="is-active">Create Expense</NavLink>
      <button onClick={props.startLogout}>Logout</button>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
