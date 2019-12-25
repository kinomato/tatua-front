import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateProduct } from '../../../actions/productAction';

class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prodName:'',
            prodPrize:'',
            prodImage:''
        }
    }
    handleChange=e=>{
        this.setState({
            name: e.target.value
        });
    }
    handleSubmit=e=>{
        e.preventDefault();
        const user={
            name:this.state.prodName,
            prize:this.state.prodPrize,
            image:this.state.prodImage
        }
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
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="Enter Product Name" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Product Prize</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Prize" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter URL Image" />
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.error
})
const mapDispatchToProps = {
    updateProduct,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)