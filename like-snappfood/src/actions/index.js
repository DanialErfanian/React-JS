import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import {getTotal} from '../reducers';

const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    shop.getProducts(products => {
        dispatch(receiveProducts(products))
    })
}

const receiveMoney = money => ({
    type: types.RECEIVE_MONEY,
    money
})

export const getMoney = () => dispatch => {
    shop.getMoney(money => {
        dispatch(receiveMoney(money))
    })
}

const addToCartUnsafe = productId => ({
    type: types.ADD_TO_CART,
    productId
})

export const addToCart = productId => (dispatch, getState) => {
    // ...
}

export const toggleLike = productId => (dispatch, getState) => {
    // ...
}

const removeFromCartUnsafe = productId => ({
    type: types.REMOVE_FROM_CART,
    productId
})

export const removeFromCart = productId => (dispatch, getState) => {
    // ...
}

const removeAllFromCartUnsafe = (productId, removeCount) => ({
    type: types.REMOVE_ALL_FROM_CART,
    productId,
    removeCount
})

export const removeAllFromCart = (productId, removeCount) => (dispatch, getState) => {
    // ...
}

export const checkout = products => (dispatch, getState) => {
    const {cart} = getState()
    const totalPrice = getTotal(getState())
    dispatch({
        type: types.CHECKOUT_REQUEST,
        totalPrice
    })
    shop.buyProducts(products, () => {
        dispatch({
            type: types.CHECKOUT_SUCCESS,
            cart
        })
        // Replace the line above with line below to rollback on failure:
        // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
}
