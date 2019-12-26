import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import MaterialTable from '@material-ui/core/Table';
import MaterialTable from 'material-table'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DetailsIcon from '@material-ui/icons/Details';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GoBackBtn from '../../goBackBtn';

import ProductDetail2 from './productDetails2'

import { getProducts, updateProduct, deleteProduct } from '../../../actions/productAction';
import Swal from 'sweetalert2'
export class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: '_id' },
                { title: 'Product Name', field: 'prodName' },
                { title: 'Product Prize', field: 'prodPrize' },
                { title: 'Status', field: 'isDeleted' }

            ],
            data: [],
            _id: '',
            updateID:''
        }
    }

    static propTypes = {
        products: PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        deleteProduct: PropTypes.func.isRequired,
        updateProduct: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }
    async fetchProduct(){
        await this.props.getProducts()
        .then(() => {
            const { products } = this.props;
            let newProds = [];
            products.forEach(product => {
                const newProd = {
                    _id: product._id,
                    prodName: product.prodName,
                    prodPrize: product.prodPrize,
                    prodURL: product.prodURL,
                    isDeleted: product.isDeleted ? 'Deleted' : 'Good'
                }
                newProds = [...newProds, newProd];
            });
            this.setState({
                data: newProds
            })
            //console.log(this.state.columns)
            //console.log(this.state.data)
        })
    }
    componentDidMount() {
        this.fetchProduct();


    }
    render() {
        const { data } = this.state;

        // console.log(_id)
        if (data.length > 0) {
            return (
                <div>
                    <Row>
                        <GoBackBtn></GoBackBtn>
                    </Row>
                    <Button variant="info">reload</Button>
                    <Grow in={true}>
                        <MaterialTable style={{ marginTop: '5vh' }}
                            title="LIST PRODUCT"
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                                {
                                    icon: 'update',
                                    tooltip: 'Update Product',
                                    handleAdd: (event, rowData) => {
                                        console.log(rowData._id)
                                        this.setState({
                                            _id: rowData._id
                                        })
                                        console.log(this.state._id)
                                    },
                                    handleUpdate: (event, rowData) => {
                                        console.log(rowData._id)
                                        this.setState({
                                            updateID: rowData._id
                                        })
                                        console.log(this.state.updateID)
                                    },
                                    handleDelete: (event, rowData) => {
                                        //alert("You deleted " + rowData.name)
                                        this.props.deleteProduct(rowData._id)
                                            .then(() => {
                                                this.fetchProduct()
                                                Swal.fire(
                                                    'Success!',
                                                    'deleted',
                                                    'success'
                                                )
                                            })
                                    }
                                }
                            ]}
                            components={{
                                Action: props => (
                                    <>
                                        {/* <IconButton
                                            onClick={(event) => props.action.handleAdd(event, props.data)}
                                            color="primary"
                                            variant="contained"

                                            size="small">
                                            <Link to={`/admin/products/${props.data._id}`} style={{ textTransform: 'none', color: 'green' }}>
                                                <DetailsIcon />
                                            </Link>
                                        </IconButton> */}
                                        <ProductDetail2 productCT={props.data} />
                                        <IconButton
                                            onClick={(event) => props.action.handleUpdate(event, props.data)}
                                            color="primary"
                                            variant="contained"
                                            style={{ textTransform: 'none', color: 'blue' }}
                                            size="small"
                                        >
                                            <Link to={`/admin/products/editProduct/${this.state._id}`}><UpdateRoundedIcon /></Link>

                                        </IconButton>
                                        <IconButton
                                            onClick={(event) => props.action.handleDelete(event, props.data)}
                                            color="primary"
                                            variant="contained"
                                            style={{ textTransform: 'none', color: 'red' }}
                                            size="small"
                                        >
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </>

                                )
                            }}
                        />
                    </Grow>
                </div>
            )
        }
        //end return
        else {
            return (
                <Container>
                    <Row style={{ marginTop: '13rem' }} className='justify-content-md-center'>
                        <Col xs lg='2'></Col>
                        <Col md='auto'>
                            <div style={{ float: 'center' }}>
                                <BeatLoader color="#50E3C2" animation="border" role="status" style={{ height: '10vh', width: '10vh' }} >
                                    <span className="sr-only"><strong style={{ fontSize: '5vh' }}>Loading...</strong></span>
                                </BeatLoader>
                            </div>
                        </Col>
                        <Col xs lg='2'></Col>
                    </Row>
                </Container>
            )
        }
        // const loading = (
        //     <Fragment>
        //         <td colSpan='5' align='center'>
        //             <BeatLoader color="#50E3C2" animation="border" role="status" style={{ height: '10vh', width: '10vh' }} >
        //                 <span className="sr-only"><strong style={{ fontSize: '5vh' }}>Loading...</strong></span>
        //             </BeatLoader>
        //         </td>
        //     </Fragment>
        // )
        // const loaded = (
        //     <Fragment>
        //         {products !== null ? products.map(product => {
        //             const { _id, prodName, prodPrize, isDeleted } = product;

        //             return (
        //                 <tr key={_id}>
        //                     {/* <td>{1}</td>
        //                     <td>{_id}</td> */}
        //                     <td>{prodName}</td>
        //                     <td>{prodPrize}</td>
        //                     <td>{isDeleted ? 'Unvailable' : 'Available'}</td>

        //                     <td>
        //                         <ButtonGroup aria-label="Basic example">
        //                             <Button variant="secondary">
        //                                 <Link to={`/admin/products/${_id}`} style={{ textDecoration: 'none', color: 'white' }}>
        //                                     Detail
        //                                 </Link>
        //                             </Button>
        //                             <Button variant="danger" onClick={()=>deleteProduct()}>Del</Button>
        //                             <Button variant="primary" onClick="handlUpdate">Update</Button>
        //                         </ButtonGroup>
        //                     </td>

        //                 </tr>
        //             )
        //         }) : null}
        //     </Fragment>
        // return (
        //     <Container>
        //         <div className="row">
        //             <Table striped bordered hover variant="dark">
        //                 <thead>
        //                     <tr>
        //                         <th>Product Name</th>
        //                         <th>Product prize (VND)</th>
        //                         <th>Status</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {!this.props.loading ? loaded : loading}
        //                 </tbody>
        //             </Table>

        //         </div>
        //         <div className="row">

        //         </div>
        //     </Container>

        // )
    }
}
const mapStateToProps = state => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.error
})
const mapDispatchToProps = {
    getProducts,
    updateProduct,
    deleteProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
