import {
    GET_ORDERS,
    ADD_ORDER,
    DELETE_ORDER,
    // GET_ORDERS_FAIL,
    // ADD_ORDER_FAIL,
    // DELETE_ORDER_FAIL,
    ORDERS_LOADING,
    GET_ORDER,
    GET_ORDERS_COUNT,
    GET_ORDERS_COUNTC,
    GET_ORDER_CHART_DATA,
    GET_ORDERS_FAIL,
    GET_ORDER_FAIL
} from '../actions/types';

const initialState = {
    orders: [],
    orderCT: null,
    loading: false,
    count: 0,
    countc: 0,
    chartdata: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case GET_ORDERS_COUNTC:
            return {
                ...state,
                countc: action.payload
            }
        case GET_ORDER_CHART_DATA:
            return {
                ...state,
                chartdata: action.payload
            }
        case GET_ORDERS:
            return {
                ...state,
                orders:action.payload,
                loading: false
            }
        case GET_ORDER:
            return {
                ...state,
                orderCT:action.payload,
                loading:false
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [action.payload,...state.orders]
            }
        case DELETE_ORDER:
            return {
                ...state
            }
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_FAIL:
        case GET_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}