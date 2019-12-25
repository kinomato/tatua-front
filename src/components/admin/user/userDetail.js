/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/userAction'

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: null
        }
    }
    static PropTypes = {
        userCT: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'GET_USER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }
    render() {
        const { userCT } = this.props;
        if (userCT !== null) {
            return (
                <div>
                    <h1>THÔNG TIN CHI TIẾT KHÁCH HÀNG</h1>
                    <p><b>Mã khách hàng :</b> {userCT._id}</p>
                    <p><b>Tên khách hàng :</b> {userCT.userName}</p>
                    <p><b>Địa chỉ :</b> {userCT.userAddress}</p>
                    <p><b>Giới tính :</b> {userCT.userName}</p>
                    <p><b>Email : </b>{userCT.userEmail}</p>
                    {/* <p><b>Ngày sinh : </b>{userCT.userBirthDay}</p> */}
                    <p><b>Số điện thoại :</b> {userCT.userPhone}</p>
                </div>

            );
        }
        return false
    }
}
const mapStateToProps = state => ({
    userCT: state.user.userCT,
    loading: state.user.loading,
    error: state.error
})
export default connect(mapStateToProps, { getUser })(UserDetail)