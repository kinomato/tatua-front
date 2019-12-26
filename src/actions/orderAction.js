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
    GET_ORDER_CHART_DATA,
    DELETE_ORDER_FAIL
} from '../actions/types';
const url_local = process.env.REACT_APP_LOCAL_URL
const url_host = process.env.REACT_APP_HOST_URL
// Lấy orders
export const getOrders = () => (dispatch) => {
    dispatch(setOrderLoading());

    return new Promise((resolve, reject) => {
        
        axios.get(`${url_local || url_host}/api/move/order`)
            .then(res => {
                dispatch({
                    type: GET_ORDERS,
                    payload: res.data
                });
                resolve()
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'GET_ORDERS_FAIL'));
                // dispatch({
                //     type: GET_ORDERS_FAIL
                // });
                reject()
            })
    })
}
export const getOrder = (id) => (dispatch) => {
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
    axios.get(`${url_local || url_host}/api/move/order/get/count`)
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
    axios.get(`${url_local || url_host}/api/move/order/get/countc`)
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
    axios.get(`${url_local || url_host}/api/move/order/get/sortcount`)
        .then(res => {
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
// export const deleteOrder = (id) => dispatch => {
//     return {
//         type: DELETE_ORDER,
//         payload: id
//     }
// }
export const deleteOrder = (id) => (dispatch) => {
    return new Promise((resolve,reject) => {
        axios.put(`${url_local || url_host}/api/move/order/delete/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: DELETE_ORDER,
                payload: res.data
            });
            resolve()
        })
        .catch(err => {
            try {
                dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_ORDER_FAIL'))
            } catch (error) {
                dispatch(returnErrors(err,null, 'DELETE_ORDER_FAIL'))
            }
            
            dispatch({
                type: DELETE_ORDER_FAIL
            })
            reject()
        })
    })
    
}
export const setOrderLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}