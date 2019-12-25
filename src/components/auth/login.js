import React, { Component } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';

import { Modal, Button, Form, Nav, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            
            email: '',
            password: '',
            msg: null,
            show: false
        }
    }
    static proprTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    handleClose = () => {
        //clear errors
        this.props.clearErrors();
        this.props.onClick();
        this.setState({ show: false });
        // console.log(this.state.show);
    }
    handleShow = (temp) => {
        this.setState({ show: temp });
        // console.log(this.state.show)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const User = {
            userEmail: this.state.email,
            userPassword: this.state.password
        }
        // console.log('hello')
        // console.log(User);
        this.props.login(User);
        this.props.onClick();
        // this.props.addItem(newItem);

    }
    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = (e) => {

        this.setState({
            password: e.target.value
        })
    }
    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error) {
            // kiem tra registor error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        if(this.state.show) {
            if(this.props.isAuthenticated) {
                this.handleClose();
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        const {temp} = nextProps;
        if(temp) 
        this.handleShow(temp);
    }
    
    render() {
        return (
            <div>
                {/* <Nav.Link onClick={() => this.handleShow()} href="#">
                    Login
                </Nav.Link> */}
                <Modal show={this.state.show} onHide={() => this.handleClose()} >
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        { this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert>:null}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId = "formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" onChange={(event) => this.onChangeEmail(event)} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId = "formBasicPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" name="password" onChange={(event) => this.onChangePassword(event)} placeholder="Enter password" />
                            </Form.Group>
                            <Button block variant="primary block" type="submit" >Login</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>

        )
    }

}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, {login, clearErrors})(Login);
