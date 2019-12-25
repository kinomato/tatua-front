import React, { Component } from 'react'
import { Row, Container, Col, } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



// import MaterialTable from '@material-ui/core/Table';
import MaterialTable from 'material-table'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DetailsIcon from '@material-ui/icons/Details';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GoBackBtn from '../../goBackBtn';

import { getToppings } from '../../../actions/toppingAction'

export class ToppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                // { title: 'ID', field: '_id' },
                { title: 'Topping Name', field: 'toppName' },
                { title: 'Topping Prize', field: 'toppPrize' },
                { title: 'Status', field: 'isDeleted' }

            ],
            data: [],
        }
    }
    static propTypes = {
        topps: PropTypes.array.isRequired,
        getToppings: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }
    async componentDidMount() {
        await this.props.getToppings()
            .then(() => {
                const { topps } = this.props;
                console.log(topps)
                let newTopps = [];
                topps.forEach(topping => {
                    const newTopp = {
                        _id: topping._id,
                        toppName: topping.toppName,
                        toppPrize: topping.toppPrize,
                        isDeleted: topping.isDeleted ? 'Deleted' : 'Good'
                    }
                    newTopps = [...newTopps, newTopp];
                });
                this.setState({
                    data: newTopps
                })
                console.log(this.state.columns)
                console.log(this.state.data)
            })
    }

    render() {
        const { data } = this.state;
        console.log(data)
        if (data.length > 0) {
            return (
                <div>
                    <Row>
                        <GoBackBtn></GoBackBtn>
                    </Row>
                    <Grow in={true}>
                        <MaterialTable style={{ marginTop: '5vh' }}
                            title="LIST TOPPING"
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                                {
                                    // icon: 'update',
                                    // tooltip: 'Update Product',
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
                                            style={{ textTransform: 'none', color: 'green' }}
                                            size="small"
                                        >
                                            <Link to={`/admin/toppings/${data._id}`}>
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
    topps: state.topping.topps,
    loading: state.topping.loading,
    error: state.error
})
const mapDispatchToProps = {
    getToppings
}
export default connect(mapStateToProps, mapDispatchToProps)(ToppingList)
