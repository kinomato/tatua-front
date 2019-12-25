import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCartItems, deleteCartItem } from '../../actions/cartAction';
import DeleteCartButton from './deleteCartButton';
import { ListGroup, Card } from 'react-bootstrap'
import IncrementBtn from './incrementBtn';
import DecrementBtn from './decrementBtn';
// import Checkout from '../paypal/checkout';
import CheckoutButton from './checkoutButton';

export class Cart extends Component {
    static propTypes = {
        cart: PropTypes.array.isRequired,
        getCartItems: PropTypes.func.isRequired,
        deleteCartItem: PropTypes.func.isRequired
    }
    componentDidMount() {
        // this.props.getCartItems();
        // console.log(this.props.cart);
    }
    render() {
        const { cart } = this.props;
        if (cart.length > 0) {
            return (
                <Card className="sticky-top">
                    <Card.Header>Giỏ hàng</Card.Header>
                    <div >
                        <ListGroup>
                            <ListGroup.Item style={{ backgroundColor: "rgba(136,255,99,0.2)" }}>
                                <div className="d-flex flex-row justify-content-between" >
                                    <small>Tổng tiền: $ {this.props.tongtien}</small>
                                </div>

                            </ListGroup.Item>
                            <div style={{ maxHeight: '70vh', overflowY: "scroll" }}>
                                {cart.map(item => {
                                    return (
                                        <ListGroup.Item>
                                            <div className="d-flex flex-row justify-content-between">
                                                <div className="d-flex flex-column">
                                                    <IncrementBtn id={item.id} />
                                                    <small>{item.sl}</small>
                                                    <DecrementBtn id={item.id} />
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
                                                <small>${item.tongtien}</small>
                                                <div className="align-self-center">
                                                    <DeleteCartButton id={item.id} />
                                                </div>

                                                {/* <Button variant="danger" onClick={() => this.props.deleteCartItem(item.id)}>x</Button> */}
                                            </div>


                                        </ListGroup.Item>



                                    )

                                })}
                            </div>


                        </ListGroup>
                    </div>
                    {/* <Checkout /> */}
                    <div style={{ margin: '1rem' }}>
                        <CheckoutButton />
                    </div>

                    {/* <Button variant="outline-success">Thanh toán</Button> */}
                </Card>
            )
        } else {
            return (
                <Card className="sticky-top">
                    <Card.Header>Giỏ hàng</Card.Header>
                    <div style={{ maxHeight: '70vh', overflowY: "scroll" }}>Đặt hàng đi bạn</div>
                </Card>

            )
        }


    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    tongtien: state.cart.tongtien
})

const mapDispatchToProps = {
    getCartItems,
    deleteCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

