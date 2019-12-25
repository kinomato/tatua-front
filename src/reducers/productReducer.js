import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_FAIL,
    PRODUCTS_LOADING,
    // ADD_PRODUCT_FAIL,
    // DELETE_PRODUCT_FAIL,
    // GET_PRODUCTS_COUNT
} from '../actions/types';

const initialState = {
    products: [],
    productCT: null,
    loading: false,
    count: 0,
    countc: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }

        case GET_PRODUCT:
            return {
                ...state,
                productCT: action.payload,
                loading: false
            }

        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                // products: [action.payload, ...state.products]
            }
        case DELETE_PRODUCT:
            return {
                ...state
            }
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_PRODUCTS_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;

    }
}