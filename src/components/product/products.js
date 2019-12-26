import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getProducts } from '../../actions/productAction';
import { getToppings } from '../../actions/toppingAction';

import PropTypes from 'prop-types';
import '../../css/textslide.css';

import ProtopModal from './protopModal'
class Products extends Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        getToppings: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }
    componentDidMount() {
        this.props.getProducts();
        this.props.getToppings();
    }
    handleOnclick(item) {
        console.log(item);
    }
    render() {
        
        const { products } = this.props;
        return (
            <div>
                <Row>
                    {products.map(product => {
                        const { _id, prodName, prodURL, prodPrize} = product;
                        return (
                            <Col style={{ marginBottom: "2rem" }}>
                                <Card  key={_id} style={{ height: "100%", width: '15rem' }}>
                                    <Card.Img variant="top" src={prodURL} style={{ height: '10rem' }} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title style={{overflowInline:"hidden"}}>
                                            {/* <div className="textslide" style={{overflowInline:"hidden"}}>
                                                {prodName}
                                            </div> */}
                                            {prodName}
                                        </Card.Title>
                                        <Card.Text className="mt-auto mb-2" >
                                            {prodPrize}
                                        </Card.Text>
                                        {/* <Button variant="primary" onClick={(product)=> this.handleOnclick(product)} block>Chọn</Button> */}
                                        {/* <AddCartButton kiboi={'kydan'} product={product} /> */}
                                       {/* <Button >sad</Button> */}
                                        <ProtopModal   product = {product}/>
                                    </Card.Body>
                                </Card>
                            </Col>


                        )
                    })}
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.error
})
export default connect(mapStateToProps, { getProducts, getToppings })(Products)