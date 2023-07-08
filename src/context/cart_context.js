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

const initialState = {
    cart: [],
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
