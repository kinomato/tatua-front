import currency from 'currency.js';
import {
    ADD_ITEM_CART,
    DELETE_ITEM_CART,
    GET_ITEM_CART,
    // GET_ITEM_CART_ERROR,
    INCR_ITEM_CART,
    CALCULATE_TONGTIEN,
    INCREMENT,
    DECREMENT
} from '../actions/types';

// return errors
export const getCartItems = () => dispatch => {
    const temp = localStorage.getItem("cart")
    let localcart = [];
    if (temp !== null) {
        localcart = temp === '' ? [] : JSON.parse(temp);
    }


    dispatch({
        type: GET_ITEM_CART,
        payload: localcart
    })
    dispatch(calculate(localcart))
}

export const incrCartItem = (cart) => dispatch => {
    dispatch(calculate(cart))
    dispatch({
        type: INCR_ITEM_CART,
        payload: cart
    })
}
// clear errors
export const addCartItem = (item, cart) => dispatch => {
    const newcart = [item, ...cart];
    dispatch(calculate(newcart))
    dispatch({
        type: ADD_ITEM_CART,
        payload: newcart
    })

}

export const deleteCartItem = (id, cart) => dispatch => {
    const newcart = cart.filter(item => item.id !== id)
    dispatch(calculate(newcart))
    dispatch({
        type: DELETE_ITEM_CART,
        payload: newcart
    })

}
export const increment = (id, cart) => dispatch => {
    const newcart = cart;
    newcart.forEach(item => {
        if (item.id === id)
            return item.sl++;
    });
    dispatch(calculate(newcart))
    dispatch({
        type: INCREMENT,
        payload: newcart
    })
}
export const decrement = (id, cart) => dispatch => {
    const newcart = cart;
    let zero = false;
    newcart.forEach(item => {
        if (item.id === id) {
            if (item.sl === 1)
                zero = true;
            return item.sl--;
        }
    });

    if (zero) {
        dispatch(deleteCartItem(id, cart))
    }
    else {
        dispatch(calculate(newcart))
        dispatch({
            type: DECREMENT,
            payload: newcart
        })
    }

}
export const calculate = (cart) => dispatch => {
    let money = 0;
    // if(cart.length === 0) 
    // console.log('shjt');
    // console.log(cart)
    cart.forEach(item => {
        const temptongtien = currency(item.tongtien)
        const temp = temptongtien.multiply(item.sl);
        money = currency(money).add(temp);
    });
    console.log(money);
    dispatch({
        type: CALCULATE_TONGTIEN,
        payload: money.value
    })
}