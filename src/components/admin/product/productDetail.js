/* eslint-disable react/no-typos */
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Container, Button, Table, ButtonGroup } from 'react-bootstrap'
// import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../../actions/productAction'

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: null
        }
    }
    static PropTypes = {
        productCT: PropTypes.object.isRequired,
        getProduct: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'GET_PRODUCT_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    render() {
        const { productCT } = this.props; //this.props.productCT
        console.log(productCT);
        if (productCT !== null) {
            return (
                // <div>{productCT.map(product => <div>{product.prodName}</div>)}</div>
                <div>
                    <h1>THÔNG TIN CHI TIẾT CỦA SẢN PHẨM</h1>
                    <p>Mã sản phẩm : {productCT._id}</p>
                    <p>Tên sản phẩm : {productCT.prodName}</p>
                    <p>Giá sản phẩm : {productCT.prodPrize}</p>
                    <img src={productCT.prodURL} alt="hinh" />
                </div>

            )
        }
        return false;

    }
}
const mapStateToProps = state => ({
    productCT: state.product.productCT,
    loading: state.product.loading,
    error: state.error
})
export default connect(mapStateToProps, { getProduct })(ProductDetail)