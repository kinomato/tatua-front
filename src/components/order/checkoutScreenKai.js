import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Badge, ListGroup, Modal, Form, Image, Container, Row, Col,Spinner } from 'react-bootstrap'
import Checkout from '../paypal/checkout';
import IncrementBtn from '../cart/incrementBtn';
import DecrementBtn from '../cart/decrementBtn';
import DeleteCartButton from '../cart/deleteCartButton';
import Checkoutv2 from '../paypal/checkoutv2';
export class CheckoutScreenKai extends Component {
    static propTypes = {
        cart: PropTypes.array.isRequired,
        getCartItems: PropTypes.func.isRequired,
    }

    render() {
        const { cart, tongtien, user } = this.props;
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>Checkout</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <Row>
                                <Col >
                                    <div className="d-flex flex-row justify-content-start">
                                        <p className="ml-3 mr-2"><strong>SHIPPING DETAIL</strong></p>

                                    </div>
                                    <hr />
                                    
                                        {user ? (
                                            <div className="mr-3 ml-3 d-flex flex-row justify-content-between">
                                            <p>{user.userName ? user.userName:'yolo'}</p>
                                             <p>{user.userEmail ? user.userEmail: 'email'}</p>
                                             </div>
                                             
                                        ):<Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                      </Spinner>}
                                        {/* <p>{user.userName ? user.userName:'yolo'}</p>
                                        <p>{user.userEmail ? user.userEmail: 'email'}</p> */}
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <div className="d-flex flex-row justify-content-start">
                                        <p className="ml-3 mr-2"><strong>PAYMENT</strong></p>

                                    </div>
                                    <hr />
                                    <Checkoutv2 />
                                </Col>
                            </Row>
                        </Col>

                        <Col md={{ span: 5, offset: 2 }}>
                            <div className="d-flex flex-row justify-content-start">
                                <p className="ml-3 mr-2">
                                    <strong>YOUR ORDER</strong></p>
                                <p><small>edit shopping bag</small></p>
                            </div>

                            <hr />
                            <Row>
                                <Col>
                                    <ListGroup variant="flush">
                                        <div style={{ maxHeight: '45vh', overflowY: "scroll" }}>
                                            {/* eslint-disable-next-line array-callback-return */}
                                            {cart.map(item => {
                                                return (<ListGroup.Item>

                                                    <div className="d-flex flex-row justify-content-between">
                                                        <div >
                                                            <Image style={{ height: "5rem", width: "6rem" }} src={item.product.prodURL} thumbnail />
                                                        </div>

                                                        <div className="d-flex flex-column">
                                                            <small><strong>
                                                                {item.product.prodName}
                                                            </strong></small>
                                                            {/* <div className="d-flex flex-row justify-content-start">
                                                                <IncrementBtn id={item.id} />
                                                                <small>{item.sl}</small>
                                                                <DecrementBtn id={item.id}/>
                                                            </div> */}
                                                            {/* <Button variant="outline-danger">del</Button> */}
                                                            {item.topps.map(topp => (
                                                                <small>{topp.toppName}-</small>
                                                            ))}
                                                            {/* <div className="d-flex flex-row">
                                                                
        
                                                            </div> */}
                                                        </div>
                                                        <div className="d-flex flex-column">
                                                            <IncrementBtn id={item.id} />
                                                            <small>{item.sl}</small>
                                                            <DecrementBtn id={item.id} />
                                                        </div>
                                                        <p>${item.tongtien}</p>
                                                        {/* <div className="align-self-center">
                                                            <DeleteCartButton id={item.id} />
                                                        </div> */}

                                                        {/* <Button variant="danger" onClick={() => this.props.deleteCartItem(item.id)}>x</Button> */}
                                                    </div>


                                                </ListGroup.Item>)
                                            })}
                                        </div>



                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                    <div className="d-flex flex-row justify-content-around">
                                        <p>tổng cộng:</p>
                                        <p>$ {tongtien}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    tongtien: state.cart.tongtien,
    user: state.auth.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreenKai)
