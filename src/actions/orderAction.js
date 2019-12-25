import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    GET_ORDERS,
    ADD_ORDER,
    DELETE_ORDER,
    // GET_ERRORS,
    // GET_ORDERS_FAIL,
    GET_ORDER_FAIL,
    ORDERS_LOADING,
    GET_ORDER,
    GET_ORDERS_COUNT,
    GET_ORDERS_COUNTC,
    GET_ORDER_CHART_DATA
} from '../actions/types';

// Lấy orders
export const getOrders = () => (dispatch) => {
    dispatch(setOrderLoading());
    axios.get('/api/move/order')
        .then(res => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_ORDERS_FAIL'));
            // dispatch({
            //     type: GET_ORDERS_FAIL
            // });
        })
}
export const getOrder= (id) => (dispatch) => {
    dispatch(setOrderLoading());
    axios.get(`/api/move/order/${id}`)
        .then(res => {
            dispatch({
                type: GET_ORDER,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_ORDER_FAIL'))
            dispatch({
                type: GET_ORDER_FAIL
            })
            // console.log("action/order_getOrder"+err);
        })
}
export const getOrdersCount = () => dispatch => {
    axios.get('/api/move/order/get/count')
        .then(res => {
            dispatch({
                type: GET_ORDERS_COUNT,
                payload: res.data
            });
        })
        .catch(err => {
            console.log("action/order_getOrdersCount" + err);
        })
} 
export const getOrdersCountc = () => dispatch => {
    axios.get('/api/move/order/get/countc')
        .then(res => {
            dispatch({
                type: GET_ORDERS_COUNTC,
                payload: res.data
            });
        })
        .catch(err => {
            console.log("action/order_getOrdersCount" + err);
        })
} 
export const getOrderChartData = () => dispatch => {
    axios.get('/api/move/order/get/sortcount')
        .then(res=> {
            dispatch({
                type: GET_ORDER_CHART_DATA,
                payload: res.data
            })
        })
        .catch(err => console.log("action/order_getOrderChart"));
}
// Thêm order
export const addOrder = (order) => dispatch => {
    return {
        type: ADD_ORDER,
        payload: order
    }

}
// Lưu trữ order
export const deleteOrder = (id) => dispatch => {
    return {
        type: DELETE_ORDER,
        payload: id
    }
}
export const setOrderLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}