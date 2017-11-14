import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
  return (
    <div>
      <h1>Info</h1>
      <p>info is:  {props.info}</p>
    </div>
  )
}

const withAdminWarning = (WrappedComponent) => {
  return (props) => {
    return(
      <div>
        <p>This is private info please don't share</p>

        {props.isAdmin && <WrappedComponent {...props}/>}
      </div>
    )
  }
}
const AdminInfo = withAdminWarning(Info)

const RequireAuthenication = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to access information</p>}
      </div>

    )
  }
};

const AuthInfo = RequireAuthenication(Info)

ReactDOM.render(<AuthInfo isAuthenticated={false} info="info text"/>, document.getElementById('app'));
