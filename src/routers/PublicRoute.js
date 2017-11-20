import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
 }) => {
  return (
    <Route {...rest} component={(props) => {
        return (!isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        ))
      }
    }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.uid
  }
}

export default connect(mapStateToProps)(PublicRoute);