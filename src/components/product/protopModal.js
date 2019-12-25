import React, { Component } from 'react'
import { Button,  Form, Image, Container, Row, Col } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/modal.css';
import ToppItem from '../topp/toppItem'
import { clearCartTopp } from '../../actions/toppingAction'
import currency from 'currency.js';
import AddCartButton from '../cart/addCartButton';
import uuid from 'uuid'
class ProTopModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            curtops: [],
            localtops: [],
            tongtien: 0

        }

    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }
    handleClose = () => {
        this.props.clearCartTopp();
        this.setState({
            show: false
        })

    }
    componentWillReceiveProps(nextprops) {
        const prodprize = currency(nextprops.product.prodPrize);
        const topptotal = nextprops.tongtientopp;
        this.setState({
            tongtien: currency(prodprize).add(topptotal)
        })
    }
    componentDidUpdate(prevProps) {
        const { tongtientopp, product } = this.props;
        const prodprize = currency(product.prodPrize);


        if (tongtientopp !== prevProps.tongtientopp) {
            this.setState({
                tongtien: currency(prodprize).add(this.props.tongtientopp)
            })
        }
    }
    render() {
        const { product, topps } = this.props;
        const newtopps = topps

        return (
            <>
                <Button block variant="outline-primary" onClick={() => this.handleShow()}>
                    Đặt
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={() => this.handleClose()}
                    dialogClassName="modal-lg"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            <div className="d-flex flex-row justify-content-start">
                                <Image src={product.prodURL} style={{ marginRight: '2rem', width: '5rem', height: '5rem' }} />
                                <div className="d-flex flex-column ">
                                    <strong>{product.prodName}</strong>
                                    <p>Giá: {product.prodPrize}</p>
                                </div>

                                <p className="align-self-end" style={{ marginLeft: '6rem' }}>Tổng tiền: ${this.state.tongtien.value}</p>

                            </div>

                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Chọn topping</h4>
                        <Form>
                            <Container>
                                <Row style={{ maxHeight: '40vh', overflowY: "scroll" }}>

                                    {newtopps.map(topp => (

                                        <Col sm={5}>
                                            <div key={topp._id} className="mb-3">
                                                <ToppItem topp={topp} />
                                            </div>
                                        </Col>
                                    ))}


                                </Row>
                            </Container>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        {/* <Button variant="primary">Save changes</Button> */}
                        <AddCartButton 
                        onClick={this.handleClose}
                        item={{
                            id: uuid(),
                            sl: 1,
                            tongtien: this.state.tongtien.value,
                            product:{...this.props.product},
                            topps: [...this.props.carttopps]
                        }} />
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state => ({
    topps: state.topping.topps,
    tongtientopp: state.topping.tongtientopp,
    carttopps: state.topping.carttopps
})
const mapDispatchToProps = {
    clearCartTopp,

}
export default connect(mapStateToProps, mapDispatchToProps)(ProTopModal)
