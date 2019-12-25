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

const inititalState = {
	promos: [],
	promoCt: null,
	loading: false
}

export default function (state = inititalState, action) {
	switch (action.type) {
		case GET_PROMOS:
			return {
				...state,
				promos: action.payload,
				loading: false
			}
		case GET_PROMO:
			return {
				...state,
				promos: action.payload,
				loading: false
			}
		case ADD_PROMO:
			return {
				...state,
				promos: [action.payload, ...state.promos]
			}
		case UPDATE_PROMO:
			return {
				...state,
			}
		case DELETE_PROMO:
			return {
				...state
			}
		// case PROMOS_LOADING:
		// 	return {
		// 		...state,
		// 		loading: true
		// 	}
		case GET_PROMOS_FAIL:
		case GET_PROMO_FAIL:
			return {
				...state,
				loading: false
			}
		case PROMOS_LOADING:
			return {
				loading: true
			}
		default:
			return state;
	}
}