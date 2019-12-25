import {
    ADD_ITEM_CART,
    DELETE_ITEM_CART,
    GET_ITEM_CART,
    GET_ITEM_CART_ERROR,
    INCR_ITEM_CART,
    CALCULATE_TONGTIEN,
    INCREMENT,
    DECREMENT
} from '../actions/types';

const initialState = {

    cart: [],
    tongtien: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM_CART:

            localStorage.setItem('cart', JSON.stringify([...action.payload]))
            return {
                ...state,
                cart: [...action.payload]
            }
        case DELETE_ITEM_CART:

            localStorage.setItem('cart', JSON.stringify([...action.payload]))
            return {
                ...state,
                cart: [...action.payload]
            }
        case INCR_ITEM_CART:
            localStorage.setItem('cart', JSON.stringify([...action.payload]))
            return {
                ...state,
                cart: [...action.payload]
            }
        case GET_ITEM_CART:
            return {
                ...state,
                cart: [...action.payload]
            }
        case INCREMENT:
            localStorage.setItem('cart', JSON.stringify([...action.payload]))
            return {
                ...state,
                cart: [...action.payload]
            }
        case DECREMENT:
            localStorage.setItem('cart', JSON.stringify([...action.payload]))
            return {
                ...state,
                cart: [...action.payload]
            }
        case CALCULATE_TONGTIEN:
            return {
                ...state,
                tongtien: action.payload
            }
        case GET_ITEM_CART_ERROR:
        default:
            return state;
    }
}