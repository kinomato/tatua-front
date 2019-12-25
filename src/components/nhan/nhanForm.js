import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setInfoNhan } from '../../actions/nhanAction';
import { Link, Redirect } from 'react-router-dom';
class NhanForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            hoTenNhan: '',
            diaChiCTNhan: '',
            sdtNhan: '',
            msg: null,
            redirect: false
        }
    }
    static proprTypes = {
        diaChiNhan: PropTypes.string.isRequired,
        error: PropTypes.object.isRequired,
        setInfoNhan: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            hoTenNhan: this.state.hoTenNhan,
            diaChiCTNhan: this.state.diaChiCTNhan,
            sdtNhan: this.state.sdtNhan
        }
        this.props.setInfoNhan(newUser)
        this.setState({ redirect: true })

        // console.log('hello')
        // console.log(newUser);
        // this.props.register(newUser);
        // this.props.addItem(newItem);

    }
    onChangeName = (e) => {

        this.setState({
            hoTenNhan: e.target.value
        })
    }
    onChangeAddressCT = (e) => {

        this.setState({
            diaChiCTNhan: e.target.value
        })
    }
    onChangePhoneNumber = (e) => {

        this.setState({
            sdtNhan: e.target.value
        })
    }
    render() {
        const { diaChiNhan, hoTenNhan, sdtNhan } = this.props;
        if (this.state.redirect === false) {
            return (
                <div>
                    <ListGroup as="ul">
                        <Link to="/gui/form/address">
                            <ListGroup.Item as="li" action>
                                {diaChiNhan === ''
                                    ? <strong>NHẬP ĐỊA CHỈ</strong>
                                    : <small>{this.props.diaChiNhan}</small>}

                            </ListGroup.Item>
                        </Link>

                    </ListGroup>
                    <Form onSubmit={this.handleSubmit}>

                        {/* <Form.Group controlId="formBasicName">
                            <Form.Label>Địa chỉ chi tiết:</Form.Label>
                            <Form.Control type="text" name="address"
                                defaultValue={diaChiCTNhan}
                                onChange={(event) => this.onChangeAddressCT(event)} placeholder="Enter address detail" />
                            
                        </Form.Group> */}
                        <Form.Group controlId="formBasicPhonenumber">
                            <Form.Label>Tên người nhận:</Form.Label>
                            <Form.Control type="text" name="name"
                                defaultValue={hoTenNhan}
                                onChange={(event) => this.onChangeName(event)} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control type="text" name="phonenumber"
                                defaultValue={sdtNhan}
                                onChange={(event) => this.onChangePhoneNumber(event)} placeholder="Enter phone number" />
                        </Form.Group>
                        <Button block variant="primary block" type="submit" >Xác nhận</Button>
                    </Form>
                </div>


            )
        } else {
            return <Redirect to={{ pathname: "/home" }} />
        }

    }
}
const mapStateToProps = state => ({
    hoTenNhan: state.nhan.hoTenNhan,
    sdtNhan: state.nhan.sdtNhan,
    diaChiCTNhan: state.nhan.diaChiCTNhan,
    diaChiNhan: state.nhan.diaChiNhan,
    error: state.error
})
export default connect(mapStateToProps, { setInfoNhan })(NhanForm)