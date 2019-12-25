import React, { Component, Fragment } from 'react'
import {logout} from '../../actions/authAction';
import { connect } from 'react-redux';
import {Nav} from 'react-bootstrap';
import PropTypes from 'prop-types'

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };
    render() {
        return (
            <Fragment>
                <Nav.Link onClick={this.props.logout} href="#">
                    Logout
                </Nav.Link>
            </Fragment>
        )
    }
}

export default connect(null,{logout})(Logout)
