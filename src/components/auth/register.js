import React, { Component } from 'react';
// import uuid from 'uuid';
import { connect } from 'react-redux';

import { Modal, Button, Form, Nav, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction'
import { clearErrors } from '../../actions/errorAction'

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            sdt: '',
            msg: null,
            show: false
        }
    }
    static proprTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    handleClose = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({ show: false });
        // console.log(this.state.show)
    }
    handleShow = () => {
        this.setState({ show: true });
        // console.log(this.state.show)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            userName: this.state.name,
            userEmail: this.state.email,
            userPassword: this.state.password,
            userPhone: this.state.sdt
        }
        // console.log('hello')
        // console.log(newUser);
        this.props.register(newUser);
        // this.props.addItem(newItem);

    }
    onChangeName = (e) => {

        this.setState({
            name: e.target.value
        })
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
    onChangePhoneNumber = (e) => {

        this.setState({
            sdt: e.target.value
        })
    }
    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error) {
            // kiem tra registor error
            if(error.id === 'REGISTER_FAIL') {
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
    render() {
        return (
            <div>
                {/* <Button variant="primary" onClick={() => this.handleShow} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    Add item
            </Button> */}
                <Nav.Link onClick={() => this.handleShow()} href="#">
                    Register
                </Nav.Link>
                <Modal show={this.state.show} onHide={() => this.handleClose()} >
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        { this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert>:null}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" name="name" onChange={(event) => this.onChangeName(event)} placeholder="Enter name" />
                                {/* <Form.Text className="text-muted">
                                We'll never share this info with anyone else.
                            </Form.Text> */}
                            </Form.Group>
                            <Form.Group controlId = "formBasicPhonenumber">
                                <Form.Label>PhoneNumber:</Form.Label>
                                <Form.Control type="text" name="phonenumber" onChange={(event) => this.onChangePhoneNumber(event)} placeholder="Enter phone number" />
                            </Form.Group>
                            <Form.Group controlId = "formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" onChange={(event) => this.onChangeEmail(event)} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId = "formBasicPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" name="password" onChange={(event) => this.onChangePassword(event)} placeholder="Enter password" />
                            </Form.Group>
                            <Button block variant="primary block" type="submit" >Register</Button>
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
export default connect(mapStateToProps, {register, clearErrors})(Register);
