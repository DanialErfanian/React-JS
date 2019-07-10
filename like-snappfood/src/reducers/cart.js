import {
    ADD_TO_CART,
    CHECKOUT_REQUEST,
    CHECKOUT_FAILURE,
    REMOVE_FROM_CART,
    RECEIVE_MONEY,
    REMOVE_ALL_FROM_CART
} from '../constants/ActionTypes'

const initialState = {
    money: 0,
    addedIds: [],
    quantityById: {}
}

const setMoney = (state = 0, action) => {
    switch (action.type) {
        case RECEIVE_MONEY:
            return action.money
        default:
            return state
    }
}

const addedIds = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            // ...
        case REMOVE_FROM_CART:
            // ...
        case REMOVE_ALL_FROM_CART:
            // ...
        default:
            return state.addedIds
    }
}

const quantityById = (state = initialState.quantityById, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // ...
        case REMOVE_FROM_CART:
            // ...
        case REMOVE_ALL_FROM_CART:
            // ...
        default:
            return state
    }
}

export const getQuantity = (state, productId) =>
    state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds
export const getMoney = state => state.money

const cart = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return initialState
        case CHECKOUT_FAILURE:
            return action.cart
        default:
            return {
                money: setMoney(state.money, action),
                addedIds: addedIds(state, action),
                quantityById: quantityById(state.quantityById, action)
            }
    }
}

export default cart
