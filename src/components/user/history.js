import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserOrderList from './userOrderList'
import {loadUserOrders} from '../../actions/userAction'
export class History extends Component {
    static propTypes = {
        prop: PropTypes
    }
    componentDidMount(){
        console.log("fuc")
        const id = this.props.user.id || this.props.user._id;
        if(!id){
            alert("id null")
        } else {
            this.props.loadUserOrders(id);
        }
    }
    render() {
        return (
            <div>
                <UserOrderList orders={this.props.orders}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.user.userOrders,
    user: state.auth.user
})

const mapDispatchToProps = {
    loadUserOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
