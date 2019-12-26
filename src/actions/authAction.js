import axios from 'axios';
import { returnErrors } from './errorAction';
// import { loadUserOrders } from './userAction';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../actions/types';

const url_local = process.env.REACT_APP_LOCAL_URL
const url_host = process.env.REACT_APP_HOST_URL

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    // get token from localstorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    axios.get(`${url_local || url_host}/api/move/auth/user`, config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            // dispatch(loadUserOrders(res.data.orders))
        })
        .catch(err => {
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// register user
export const register = ({ userName, userEmail, userPassword, userPhone }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ userName, userEmail, userPassword, userPhone });

    axios.post(`${url_local || url_host}/api/move/user/register`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            // dispatch(loadUserOrders(res.data.user.orders))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })

        })
}
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const login = ({ userEmail, userPassword }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ userEmail, userPassword });

    axios.post(`${url_local || url_host}/api/move/auth/login`, body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // dispatch(loadUserOrders(res.data.user.orders))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })

        })
}