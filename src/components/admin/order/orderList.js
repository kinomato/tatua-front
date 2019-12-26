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

 import OrderDetail from './orderDetail'

import { getOrders,deleteOrder } from '../../../actions/orderAction';
import Swal from 'sweetalert2'
export class OrderList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: '_id' },
                { title: 'Create time', field: 'create_time' },
                { title: 'Email', field: 'email' },
                { title: 'Total Price', field: 'prizeWithPromo' },
                { title: 'Status', field: 'isDeleted' }

            ],
            data: []
        }
    }

    static propTypes = {
        orders: PropTypes.array.isRequired,
        getOrders: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }
    async fetchOrder(){
        await this.props.getOrders()
            .then(() => {
                const { orders } = this.props;
                let newProds = [];
                orders.forEach(order => {
                    const newProd = {
                        _id: order._id,
                        userId: order.userId,
                        name: order.name,
                        email: order.email,
                        phone: order.phone,
                        prizeOrigin: order.prizeOrigin,
                        prizeWithPromo: "$" + order.prizeWithPromo,
                        create_time: order.create_time,
                        isDeleted: order.isDeleted ? 'Deleted' : 'Good',
                        items: order.items
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
    componentDidMount() {
        this.fetchOrder()

    }
    render() {
        const { data } = this.state;
        const _id = data.map(product => {
            const { _id } = product;
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
                            title="LIST ORDER"
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
                                    handleDelete: (event, rowData) => {
                                        this.props.deleteOrder(rowData._id)
                                            .then(() => {
                                                this.fetchOrder()
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

                                        <OrderDetail orderCT={props.data} />
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

    }
}
const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.error
})
const mapDispatchToProps = {
    getOrders,
    deleteOrder
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
