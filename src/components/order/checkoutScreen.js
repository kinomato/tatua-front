import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button,Badge,ListGroup, Modal, Form, Image, Container, Row, Col } from 'react-bootstrap'
import Checkout from '../paypal/checkout';
import Checkoutv2 from '../paypal/checkoutv2'
export class CheckoutScreen extends Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            show: false
        }
    }
    static propTypes = {
        cart: PropTypes.array.isRequired,
        getCartItems: PropTypes.func.isRequired,
    }
    handleShow = (temp) => {
        this.setState({
            show: temp
        })
    }
    handleClose = () => {
        this.props.onClick();
        this.setState({
            show: false
        })

    }
    componentWillReceiveProps(nextProps) {
        const { temp } = nextProps;
        if (temp)
            this.handleShow(temp);
    }
    render() {
        const { cart, tongtien } = this.props;
        return (
            <>
                <Modal
                    show={this.state.show}
                    onHide={() => this.handleClose()}
                    dialogClassName="modal-lg"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            <h4>Tesing</h4>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    {cart.map(item => {
                                        return (
                                              <ListGroup.Item>
                                                <div
                                                
                                                 className="d-flex flex-row justify-content-between">
                                                    {/* <div className="d-flex flex-column">
                                                    </div> */}
                                                    <Badge pill variant="info">{item.sl}</Badge>
                                                    {/* <small>{item.sl}</small> */}
                                                    {item.product.prodName}
                                                    <small>${item.tongtien}</small>
                                                </div>
                                              </ListGroup.Item>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </Container>

                    </Modal.Body>

                    <Modal.Footer>
                        <Checkout />
                        <Checkoutv2/>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    tongtien: state.cart.tongtien
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)
