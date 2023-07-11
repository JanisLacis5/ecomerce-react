import React, {useEffect, useContext, useReducer} from "react"
import reducer from "../reducers/cart_reducer"
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from "../actions"
import {useProductsContext} from "./products_context"

const getLocalStorage = () => {
    let cart = localStorage.getItem("cart")
    if (cart) {
        return JSON.parse(localStorage.getItem("cart"))
    } else {
        return []
    }
}

const initialState = {
    cart: getLocalStorage(),
    total: 0,
    shipping: 0,
    subtotal: 0,
}

const CartContext = React.createContext()

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = (id, activeBtn, count, product) => {
        dispatch({type: ADD_TO_CART, payload: {id, count, activeBtn, product}})
    }
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    const removeItem = (id) => {
        dispatch({type: REMOVE_CART_ITEM, payload: {id}})
    }
    const toggleAmount = (id, func) => {
        dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, func}})
    }
    const countTotals = () => {
        dispatch({type: COUNT_CART_TOTALS})
    }
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart))
        countTotals()
    }, [state.cart])
    return (
        <CartContext.Provider
            value={{...state, addToCart, clearCart, removeItem, toggleAmount}}>
            {children}
        </CartContext.Provider>
    )
}
// make sure use
export const useCartContext = () => {
    return useContext(CartContext)
}
