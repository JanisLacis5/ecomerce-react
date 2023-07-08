import React from "react"
import {useFilterContext} from "../context/filter_context"
import GridView from "./GridView"
import ListView from "./ListView"

const ProductList = () => {
    const {filters} = useFilterContext()
    const {filteredProducts} = useFilterContext()
    if (!filteredProducts.length) {
        return <h5>No products found</h5>
    }

    if (filters.layout === "grid")
        return <GridView filteredProducts={filteredProducts} />
    else return <ListView filteredProducts={filteredProducts} />
}

export default ProductList
