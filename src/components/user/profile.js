import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap'
export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            address: '',
            gender: '',
            phone: ''
        }
    }
    static propTypes = {
        user: PropTypes.object.isRequired
    }
    componentDidMount() {
        const { user } = this.props
        this.setState({
            email: user.userEmail,
            name: user.userName,
            address: user.userAddress,
            gender: user.userGender,
            phone: user.userPhone
        })
    }
    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })
    }
    onChangeName = (e) => {

        this.setState({
            name: e.target.value
        })
    }
    onChangeGender = (e) => {

        this.setState({
            gender: e.target.value
        })
    }
    onChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            userName: this.state.name,
            userGender: this.state.gender,
            userPhone: this.state.phone,
            userAddress: this.state.address
        }
        console.log(newUser)

    }
    render() {
        const { user } = this.props
        const { name, address, gender, phone } = this.state;
        return (

            <div>

                <Card>
                    <Card.Header>Thay đổi thông tin</Card.Header>
                    <div>
                        <Container >
                            <Row>
                                <Col >
                                    <Form style = {{marginBottom:'1rem'}} onSubmit={this.handleSubmit}>
                                        <Form.Group as={Row} controlId="formBasicEmail">
                                            <Form.Label column sm="2">Email:</Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    plaintext defaultValue={user.userEmail}
                                                    type="email" name="email"
                                                    placeholder="Enter email" readOnly />
                                            </Col>

                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formBasicName">
                                            <Form.Label column sm="2">Tên:</Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    value={name}
                                                    type="text" name="name"
                                                    onChange={(event) => this.onChangeName(event)}
                                                    placeholder="Nhập tên" />

                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                            <Form.Label column sm="2">Giới tính</Form.Label>
                                            <Col sm="10">
                                                <Form.Control onChange={(event) => this.onChangeGender(event)} value={gender} as="select">
                                                    <option>Không chọn</option>
                                                    <option>Nam</option>
                                                    <option>Nữ</option>
                                                </Form.Control>
                                            </Col>

                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formBasicAddress">
                                            <Form.Label column sm="2">Địa chỉ:</Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    value={address}
                                                    type="text" name="address"
                                                    onChange={(event) => this.onChangeAddress(event)}
                                                    placeholder="Nhập địa chỉ" />
                                            </Col>

                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formBasicPhone">
                                            <Form.Label column sm="2">Số điện thoại:</Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    value={phone} type="text" name="phone"
                                                    onChange={(event) => this.onChangePhone(event)}
                                                    placeholder="Nhập số diện thoại" />
                                            </Col>

                                        </Form.Group>
                                        <Button block variant="primary block" type="submit" >Save</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
