import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserRoute = ({ component: Component, isAuthenticated: authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (authed)
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/forbidden" }} />}
  />
);
UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default withRouter(connect(mapStateToProps)(UserRoute)) 
