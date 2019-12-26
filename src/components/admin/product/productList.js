import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
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

import { getProducts, updateProduct, deleteProduct } from '../../../actions/productAction';

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
            data: []
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
    async componentDidMount() {
        await this.props.getProducts()
            .then(() => {
                const { products } = this.props;
                let newProds = [];
                products.forEach(product => {
                    const newProd = {
                        _id: product._id,
                        prodName: product.prodName,
                        prodPrize: product.prodPrize,
                        isDeleted: product.isDeleted ? 'Deleted' : 'Good'
                    }
                    newProds = [...newProds, newProd];
                });
                this.setState({
                    data: newProds
                })
                console.log(this.state.columns)
                console.log(this.state.data)
            })

    }
    render() {
        const { data } = this.state;
        const _id = data.map(product => {
            const{_id} = product;
        })
        console.log(_id)
        if (data.length > 0) {
            return (
                <div>
                    <Row>
                        <GoBackBtn></GoBackBtn>
                    </Row>
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
                                        console.log(event)
                                    },
                                    handleUpdate: (event, rowData) => {
                                        console.log(event)
                                    },
                                    handleDelete: (event, rowData) => alert("You deleted " + rowData.name)
                                }
                            ]}
                            components={{
                                Action: props => (
                                    <>
                                        <IconButton
                                            onClick={(event) => props.action.handleAdd(event, props.data)}
                                            color="primary"
                                            variant="contained"

                                            size="small">
                                            <Link to={`/admin/products/${_id}`} style={{ textTransform: 'none', color: 'green' }}>
                                                <DetailsIcon />
                                            </Link>
                                        </IconButton>
                                        <IconButton
                                            onClick={(event) => props.action.handleUpdate(event, props.data)}
                                            color="primary"
                                            variant="contained"
                                            style={{ textTransform: 'none', color: 'blue' }}
                                            size="small"
                                        >
                                            <Link to={'/admin/products/editProduct'}><UpdateRoundedIcon /></Link>

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
    updateProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
