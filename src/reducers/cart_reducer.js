import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from "../actions"

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const item = {
            ...action.payload.product,
            count: action.payload.count,
            color: action.payload.activeBtn,
        }
        let clone = [...state.cart, item]
        return {...state, cart: clone}
    }
    if (action.type === CLEAR_CART) {
        return {...state, cart: []}
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
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
