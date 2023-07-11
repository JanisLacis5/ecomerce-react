import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from "../actions"

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const {id, count, activeBtn, product} = action.payload

        const newItem = state.cart.find(
            (cartItem) => id + activeBtn === cartItem.id + cartItem.color
        )

        if (newItem) {
            if (newItem.stock > newItem.count) {
                newItem.count = newItem.count + 1
            }
            if (!state.cart.length) {
                return {...state, shipping: 534}
            }
            return {...state}
        } else {
            const tempItem = {
                ...product,
                count: count,
                color: activeBtn,
            }
            if (!state.cart.length) {
                return {
                    ...state,
                    shipping: 534,
                    cart: [...state.cart, tempItem],
                }
            }
            return {
                ...state,
                cart: [...state.cart, tempItem],
            }
        }
    }
    if (action.type === CLEAR_CART) {
        return {...state, cart: [], shipping: 0}
    }
    if (action.type === REMOVE_CART_ITEM) {
        let newArr = state.cart.filter(
            (product) => product.id !== action.payload.id
        )
        return {...state, cart: newArr}
    }
    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const tempCart = state.cart.map((product) => {
            if (product.id === action.payload.id) {
                if (action.payload.func === "increase") {
                    if (product.count < product.stock) {
                        let newCount = product.count + 1
                        return {...product, count: newCount}
                    }
                }
                if (action.payload.func === "decrease") {
                    if (product.count > 1) {
                        let newCount = product.count - 1
                        return {...product, count: newCount}
                    }
                }
            }
            return product
        })
        return {...state, cart: tempCart}
    }
    if (action.type === COUNT_CART_TOTALS) {
        let subtotal = 0
        state.cart.map((item) => {
            subtotal += item.price
        })
        let total = subtotal + state.shipping
        return {...state, total: total, subtotal: subtotal}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
