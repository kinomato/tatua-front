import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    GET_USERS,
    // ADD_USER,
    // DELETE_USER,
    // GET_ERRORS,
    // GET_ORDERS_FAIL,
    // USERS_LOADING,
    GET_USER,
    GET_USER_FAIL,
    // ADD_USER,
    // ADD_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    // DELETE_USER,
    // DELETE_USER_FAIL,
    GET_USERS_FAIL,
    GET_USERS_COUNT,
    USERS_LOADING,
    SAVE_ORDER,
    SAVE_ORDER_FAIL,
    LOAD_USER_ORDERS

} from '../actions/types';

// Lấy orders
export const getUsersCount = () => (dispatch) => {
    axios.get('/api/move/user/get/count')
        .then(res => {
            dispatch({
                type: GET_USERS_COUNT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: GET_ORDERS_FAIL
            // });
        })
}
export const getUsers = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setUserLoading())
    axios.get('/api/move/user').then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
        resolve()
    })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_USERS_FAIL'))
            dispatch({
                type: GET_USERS_FAIL
            })
            reject()
        })
    })
    
        
}
export const getUser = (id) => (dispatch) => {
    axios.get(`/api/move/user/${id}`).then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCT_FAIL'))
        dispatch({
            type: GET_USER_FAIL
        })
    })
}

export const updateUser = (id) => (dispatch) => {
    axios.put(`/api/move/user/update/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: UPDATE_USER,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_USER_FAIL'))
            dispatch({
                type: UPDATE_USER_FAIL
            })
        })
}
export const loadUserOrders = (orders) => async dispatch => {
    dispatch({
        type:LOAD_USER_ORDERS,
        payload: orders
    })
}
export const saveOrder =  (orderData,uid) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(orderData);
    axios.post('http://localhost:8000/api/move/order/saveorder',body,config)
    .then(res => {
        dispatch({
            type:SAVE_ORDER
        })
        // const {id} = res;
        // const newUserdata = {
        //     uid,
        //     oid:id
        // }
        // const body1 = JSON.stringify(newUserdata);
        // axios.put('http://localhost:8000/api/move/user/saveorderid',body1,config)
        // .then(res1 => {
        //     const {oid} = res1;
        //     dispatch({
        //         type:SAVE_ORDER,
        //         payload:oid
        //     })
        // })
        // .catch(err => {
        //     try {
        //         console.log(err.response.data)

        //     } catch (error) {
                
        //     }
        //     dispatch({
        //         type:SAVE_ORDER_FAIL,
        //     })
        // })
    })
    .catch(err => {
        try {
            console.log(err.response.data)

        } catch (error) {
            
        }
            
        dispatch({
            type:SAVE_ORDER_FAIL,
        })
    })
    
}
export const setUserLoading = () => {
    return {
        type: USERS_LOADING
    }
}
