import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import MaterialTable from 'material-table'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DetailsIcon from '@material-ui/icons/Details';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GoBackBtn from '../../goBackBtn';

import { getUsers } from '../../../actions/userAction';

export class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                // { title: 'ID', field: '_id' },
                { title: 'User Name', field: 'userName' },
                { title: 'Address', field: 'userAddress' },
                { title: 'Gender', field: 'userGender' },
                { title: 'Email', field: 'userEmail' },
                { title: 'Phone', field: 'userPhone' }
            ],
            data: [],
        }
    }

    static propTypes = {
        users: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }
    async componentDidMount() {
        await this.props.getUsers()
            .then(() => {
                const { users } = this.props;
                let newUsers = [];
                users.forEach(user => {
                    const newUser = {
                        userName: user.userName,
                        userAddress: user.userAddress,
                        userGender: user.userGender,
                        userEmail: user.userEmail,
                        userPhone: user.userPhone
                    }
                    newUsers = [...newUsers, newUser];
                });
                this.setState({
                    data: newUsers
                })
                console.log(this.state.columns)
                console.log(this.state.data)
            })
    }

    render() {
        const { data } = this.state;
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
        //         {users !== null ? users.map(user => {
        //             const { _id, userName, userEmail, userAddress, userPhone, userGenre, userPassword } = user;

        //             return (
        //                 <tr key={_id}>
        //                     {/* <td>{1}</td>
        //                     <td>{_id}</td> */}
        //                     <td>{userName}</td>
        //                     <td>{userEmail}</td>
        //                     <td>{userAddress}</td>
        //                     <td>{userPhone}</td>
        //                     <td>{userGenre}</td>
        //                     <td>{userPassword}</td>
        //                     {/* <td>{isDeleted ? 'Unvailable' : 'Available'}</td> */}

        //                     <td>
        //                         <ButtonGroup aria-label="Basic example">
        //                             <Button variant="secondary">
        //                                 <Link to={`/admin/users/${_id}`} style={{ textDecoration: 'none', color: 'white' }}>
        //                                     Detail
        //                                 </Link>
        //                             </Button>
        //                             <Button variant="danger">Del</Button>
        //                             <Button variant="primary">Update</Button>
        //                         </ButtonGroup>


        //                     </td>

        //                 </tr>
        //             )
        //         }) : null}
        //     </Fragment>
        // )
        // return (
        //     <Container>
        //         <div className="row">
        //             <Table striped bordered hover variant="dark">
        //                 <thead>
        //                     <tr>
        //                         <th>Name</th>
        //                         <th>Email</th>
        //                         <th>Address</th>
        //                         <th>Phone</th>
        //                         <th>Genre</th>
        //                         <th>Password</th>
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
        if (data.length > 0) {
            return (
                <div>
                    <Row>
                        <GoBackBtn></GoBackBtn>
                    </Row>
                    <Grow in={true}>
                        <MaterialTable style={{ marginTop: '5vh' }}
                            title="LIST USERS"
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                                {
                                    icon: 'update',
                                    tooltip: 'Update User',
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
                                            <DetailsIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={(event) => props.action.handleUpdate(event, props.data)}
                                            color="primary"
                                            variant="contained"
                                            style={{ textTransform: 'none', color: 'blue' }}
                                            size="small"
                                        >
                                            <Link to={''}><UpdateRoundedIcon /></Link>

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
    users: state.user.users,
    loading: state.user.loading,
    error: state.error
})
const mapDispatchToProps = {
    getUsers,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)
