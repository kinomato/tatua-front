import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated: authed, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (authed&& user.priority >=1)
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/forbidden" }} />}
  />
);
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})
export default withRouter(connect(mapStateToProps)(PrivateRoute)) 
