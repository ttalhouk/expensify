import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { startLogout } from '../actions/auth';

export const Header = (props) => {
  return(
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to='/dashboard'>
            <h1>Expensify</h1>
          </Link>

          <button
            className="button button--link"
            onClick={props.startLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
