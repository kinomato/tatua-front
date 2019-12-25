import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    GET_PRODUCTS,
    GET_PRODUCT_FAIL,
    ADD_PRODUCT,
    ADD_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_FAIL,
    PRODUCTS_LOADING,
    GET_PRODUCT
} from '../actions/types';

export const getProducts = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setOrderLoading());
        axios.get('/api/move/product')
            .then(res => {
                console.log("From product action : " + res.data)
                dispatch({
                    type: GET_PRODUCTS,
                    payload: res.data
                });
                resolve()
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCTS_FAIL'));
                reject()
            })
    })
}
export const getProduct = (id) => (dispatch) => {
    dispatch(setOrderLoading());
    axios.get(`/api/move/product/${id}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCT_FAIL'))
            dispatch({
                type: GET_PRODUCT_FAIL
            })
        })
}

export const updateProduct = (id) => (dispatch) => {
    axios.put(`/api/move/product/update/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_PRODUCT_FAIL'))
            dispatch({
                type: UPDATE_PRODUCT_FAIL
            })
        })
}
export const deleteProduct = (id) => (dispatch) => {
    axios.put(`/api/move/product/delete/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: DELETE_PRODUCT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_PRODUCT_FAIL'))
            dispatch({
                type: DELETE_PRODUCT_FAIL
            })
        })
}

export const setOrderLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}