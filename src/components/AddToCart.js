import React, {useState} from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import {FaCheck} from "react-icons/fa"
import {useCartContext} from "../context/cart_context"
import AmountButtons from "./AmountButtons"

const AddToCart = ({singleProduct}) => {
    const {colors, stock, id} = singleProduct
    const {addToCart} = useCartContext()
    const [activeBtn, setActiveBtn] = useState(colors[0])
    const [count, setCount] = useState(1)
    const increase = () => {
        if (count < stock) {
            setCount(count + 1)
        }
        return count
    }
    const decrease = () => {
        if (count > 1) {
            setCount(count - 1)
        }
        return count
    }
    if (stock) {
        return (
            <Wrapper>
                <div className="colors">
                    <span>Color:</span>
                    <div>
                        {colors.map((c, index) => {
                            return (
                                <button
                                    className={
                                        c === activeBtn
                                            ? "color-btn active"
                                            : "color-btn"
                                    }
                                    type="button"
                                    key={index}
                                    style={{backgroundColor: c}}
                                    onClick={() => {
                                        setActiveBtn(c)
                                    }}>
                                    {c === activeBtn && <FaCheck />}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="btn-container">
                    <AmountButtons
                        count={count}
                        increase={increase}
                        decrease={decrease}
                    />
                    <Link
                        to="/cart"
                        className="btn"
                        onClick={() =>
                            addToCart(id, activeBtn, count, singleProduct)
                        }>
                        Add to cart
                    </Link>
                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.section`
    margin-top: 2rem;
    .colors {
        display: grid;
        grid-template-columns: 125px 1fr;
        align-items: center;
        margin-bottom: 1rem;
        span {
            text-transform: capitalize;
            font-weight: 700;
        }
        div {
            display: flex;
        }
    }
    .color-btn {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #222;
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 0.75rem;
            color: var(--clr-white);
        }
    }
    .active {
        opacity: 1;
    }
    .btn-container {
        margin-top: 2rem;
    }

    .btn {
        margin-top: 1rem;
    }
`
export default AddToCart
