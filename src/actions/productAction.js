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
    GET_PRODUCT,
    SEARCH_ORDER
} from '../actions/types';
const url_local = process.env.REACT_APP_LOCAL_URL
const url_host = process.env.REACT_APP_HOST_URL

export const searchProduct = (searchtxt) => dispatch => {
    let text = searchtxt
    if(text === null || text=== undefined){
        text= '';
    }
    dispatch({
        type: SEARCH_ORDER,
        payload:text
    })
}
export const getProducts = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setOrderLoading());
        axios.get(`${url_local || url_host}/api/move/product`)
            .then(res => {
                //console.log("From product action : " + res.data)
                dispatch({
                    type: GET_PRODUCTS,
                    payload: res.data
                });
                dispatch(searchProduct())
                
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
    axios.get(`${url_local || url_host}/api/move/product/${id}`)
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
    axios.put(`${url_local || url_host}/api/move/product/update/${id}`)
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
    return new Promise((resolve,reject) => {
        axios.put(`${url_local || url_host}/api/move/product/delete/${id}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: DELETE_PRODUCT,
                payload: res.data
            });
            resolve()
        })
        .catch(err => {
            try {
                dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_PRODUCT_FAIL'))
            } catch (error) {
                dispatch(returnErrors(err,null, 'UPDATE_PRODUCT_FAIL'))
            }
            
            dispatch({
                type: DELETE_PRODUCT_FAIL
            })
            reject()
        })
    })
    
}

export const setOrderLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}