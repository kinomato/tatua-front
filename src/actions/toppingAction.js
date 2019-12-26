import axios from 'axios';
import { returnErrors } from './errorAction';
import currency from 'currency.js';
import {
    GET_TOPPINGS,
    GET_TOPPING,
    TOPPINGS_LOADING,
    ADD_CART_TOPP,
    REMOVE_CART_TOPP,
    CLEAR_CART_TOPPS,
    CALCULATE_TONGTIEN_TOPP,
    ADD_TOPPING,
    DELETE_TOPPING,
    DELETE_TOPPING_FAIL
} from '../actions/types';
const url_local = process.env.REACT_APP_LOCAL_URL
const url_host = process.env.REACT_APP_HOST_URL
export const deleteTopping = (id) => (dispatch) => {
    return new Promise((resolve,reject) => {
        axios.put(`${url_local || url_host}/api/move/topp/delete/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: DELETE_TOPPING,
                payload: res.data
            });
            resolve()
        })
        .catch(err => {
            try {
                dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_TOPPING_FAIL'))
            } catch (error) {
                dispatch(returnErrors(err,null, 'DELETE_TOPPING_FAIL'))
            }
            
            dispatch({
                type: DELETE_TOPPING_FAIL
            })
            reject()
        })
    })
    
}
export const getToppings = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setToppLoading());
        axios.get(`${url_local || url_host}/api/move/topp`)
            .then(res => {
                dispatch({
                    type: GET_TOPPINGS,
                    payload: res.data
                });
                resolve()
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'GET_TOPPINGS_FAIL'));
                reject()
            })
    })
}
export const getTopping = (id) => (dispatch) => {
    axios.get(`${url_local || url_host}/api/move/topp/${id}`)
        .then(res => {
            dispatch({
                type: GET_TOPPING,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_TOPPING_FAIL'));
        })
}
export const addTopping = () => (dispatch) => {
    axios.post(`${url_local || url_host}/api/move/topp/add`)
        .then(res => {
            dispatch({
                type: ADD_TOPPING,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_TOPPING_FAIL'));
        })
}
export const addCartTopp = (topp, carttopps) => dispatch => {
    const newcarttopps = [topp, ...carttopps]
    dispatch({
        type: ADD_CART_TOPP,
        payload: newcarttopps
    })
    dispatch(calculate(newcarttopps))
}
export const removeCartTopp = (id, carttopps) => dispatch => {
    const newcarttopps = carttopps.filter(item => item._id !== id)
    dispatch({
        type: REMOVE_CART_TOPP,
        payload: newcarttopps
    })
    dispatch(calculate(newcarttopps))
}
export const clearCartTopp = () => dispatch => {
    dispatch({
        type: CLEAR_CART_TOPPS
    })
    dispatch(calculate([]))
}
export const calculate = (carttopps) => dispatch => {
    const newcarttopps = carttopps;
    let tongtien = 0;
    if (carttopps.length === 0) {
        dispatch({
            type: CALCULATE_TONGTIEN_TOPP,
            payload: tongtien
        })
    } else {
        newcarttopps.forEach(topp => {
            const temp = currency(topp.toppPrize);
            tongtien = currency(tongtien).add(temp);
        });
        console.log("from topping action" + tongtien)
        dispatch({
            type: CALCULATE_TONGTIEN_TOPP,
            payload: tongtien
        })
    }

}
// export const getProduct = (id) => (dispatch) => {
//     dispatch(setOrderLoading());
//     axios.get(`/api/move/product/${id}`)
//         .then(res => {
//             dispatch({
//                 type: GET_PRODUCT,
//                 payload: res.data
//             });
//         })
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCT_FAIL'))
//             dispatch({
//                 type: GET_PRODUCT_FAIL
//             })
//         })
// }

export const setToppLoading = () => {
    return {
        type: TOPPINGS_LOADING
    }
}