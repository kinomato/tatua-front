import {
    GET_USERS,
    ADD_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER,
    DELETE_USER,
    // GET_ERRORS,
    // GET_ORDERS_FAIL,
    USERS_LOADING,
    GET_USER,
    GET_USER_FAIL,
    GET_USERS_FAIL,
    GET_USERS_COUNT,
    SAVE_ORDER,
    SAVE_ORDER_FAIL,
    LOAD_USER_ORDERS
} from '../actions/types';

const initialState = {
    users: [],
    userCT: null,
    loading: false,
    count: 0,
    userOrders:[]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_ORDERS:
            return {
                ...state,
                userOrders: [...action.payload]
            }
        case GET_USERS_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                userCT: action.payload,
                loading: false
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case UPDATE_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case SAVE_ORDER:
            return {
                ...state,
                // userOrders:[...state.userOrders,action.payload]
            }
        case SAVE_ORDER_FAIL:
            return {
                ...state
            }
        case GET_USERS_FAIL:
        case UPDATE_USER_FAIL:
        case GET_USER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}