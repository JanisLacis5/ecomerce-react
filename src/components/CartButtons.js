import React from "react"
import {FaShoppingCart, FaUserMinus, FaUserPlus} from "react-icons/fa"
import {Link} from "react-router-dom"
import styled from "styled-components"
import {useProductsContext} from "../context/products_context"
import {useCartContext} from "../context/cart_context"
import {useUserContext} from "../context/user_context"

const CartButtons = () => {
    return (
        <Wrapper>
            <Link to="/cart" className="cart-btn">
                Cart
                <span className="cart-container">
                    <FaShoppingCart />
                    <span className="cart-value">0</span>
                </span>
            </Link>
            <button type="button" className="auth-btn">
                Login
                <span className="cart-container">
                    <FaUserPlus />
                </span>
            </button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .cart-btn {
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;
        align-items: center;
        margin-right: 3rem;
    }
    .cart-container {
        display: flex;
        align-items: center;
        position: relative;
        svg {
            height: 1.6rem;
            margin-left: 5px;
        }
    }
    .cart-value {
        position: absolute;
        top: -10px;
        right: -16px;
        background: var(--clr-primary-5);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.75rem;
        color: var(--clr-white);
        padding: 12px;
    }
    .auth-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border-color: transparent;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--clr-grey-1);
        letter-spacing: var(--spacing);
        svg {
            margin-left: 5px;
        }
        margin-left: 3rem;
    }
`
export default CartButtons
