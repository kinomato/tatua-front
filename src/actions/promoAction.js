import axios from 'axios';
import { returnErrors } from './errorAction';
import currency from 'currency.js';

import {
	GET_PROMOS,
	GET_PROMO,
	GET_PROMOS_FAIL,
	GET_PROMO_FAIL,
	ADD_PROMO,
	UPDATE_PROMO,
	DELETE_PROMO,
	PROMOS_LOADING
} from '../actions/types';

export const getPromos = () => (dispatch) => {
	return new Promise((resolve, reject) => {
			dispatch(setPromoLoading());
			axios.get('/api/move/promo')
					.then(res => {
							dispatch({
									type: GET_PROMOS,
									payload: res.data
							});
							resolve()
					})
					.catch(err => {
							dispatch(returnErrors(err.response.data, err.response.status, 'GET_PROMOS_FAIL'));
							reject()
					})
	})
}

export const getPromo = (id) => (dispatch) => {
	axios.get(`/api/move/promo/${id}`)
			.then(res => {
					dispatch({
							type: GET_PROMO,
							payload: res.data
					});
			})
			.catch(err => {
					dispatch(returnErrors(err.response.data, err.response.status, 'GET_PROMO_FAIL'));
			})
}



export const setPromoLoading = () => {
	return {
			type: PROMOS_LOADING
	}
}