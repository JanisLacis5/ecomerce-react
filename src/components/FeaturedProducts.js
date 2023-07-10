import React from "react"
import {useProductsContext} from "../context/products_context"
import {Link} from "react-router-dom"
import styled from "styled-components"
import Product from "./Product"

const FeaturedProducts = () => {
    const {featuredProducts, productsLoading} = useProductsContext()
    const arr = featuredProducts.slice(0, 3)

    if (productsLoading) {
        return <div className="loader"></div>
    }

    return (
        <Wrapper className="section">
            <div className="title">
                <h2>Featured Products</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center featured">
                {arr.map((item) => {
                    return <Product key={item.id} {...item} />
                })}
            </div>
            <Link to="/products" className="btn">
                ALL PRODUCTS
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background: var(--clr-grey-10);
    .featured {
        margin: 4rem auto;
        display: grid;
        gap: 2.5rem;
        img {
            height: 225px;
        }
    }
    .btn {
        display: block;
        width: 148px;
        margin: 0 auto;
        text-align: center;
    }
    @media (min-width: 576px) {
        .featured {
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
        }
    }
`

export default FeaturedProducts
