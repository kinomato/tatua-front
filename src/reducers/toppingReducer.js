
import {
    TOPPINGS_LOADING,
    GET_TOPPING,
    GET_TOPPINGS,
    GET_TOPPINGS_FAIL,
    GET_TOPPING_FAIL,
    DELETE_TOPPING,
    ADD_CART_TOPP,
    REMOVE_CART_TOPP,
    CLEAR_CART_TOPPS,
    CALCULATE_TONGTIEN_TOPP,

} from '../actions/types';

const initialState = {
    topps: [],
    toppCT: null,
    loading: false,
    carttopps: [],
    tongtientopp: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TOPPINGS:
            return {
                ...state,
                topps: action.payload,
                loading: false
            }

        case GET_TOPPING:
            return {
                ...state,
                toppCT: action.payload,
                loading: false
            }
        case CALCULATE_TONGTIEN_TOPP:
            return {
                ...state,
                tongtientopp: action.payload
            }
        case ADD_CART_TOPP: 
        return {
            ...state,
            carttopps: [...action.payload]
        }
        case DELETE_TOPPING: 
        return {
            ...state,
        }
        case REMOVE_CART_TOPP: 
        return {
            ...state,
            carttopps: [...action.payload]
        }
        case CLEAR_CART_TOPPS: 
        return {
            ...state,
            carttopps: []
        }
        // case ADD_PRODUCT:
        //     return {
        //         ...state,
        //         products: [action.payload, ...state.products]
        //     }
        // case DELETE_PRODUCT:
        //     return {
        //         ...state
        //     }
        case TOPPINGS_LOADING:
            return {
                ...state,
                loading: true
            }

        // case GET_PRODUCTS_FAIL:
        // case GET_PRODUCT_FAIL:
        //     return {
        //         ...state,
        //         loading: false
        //     }

        default:
            return state;

    }
}