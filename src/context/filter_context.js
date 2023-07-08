import React, {useEffect, useContext, useReducer} from "react"
import reducer from "../reducers/filter_reducer"
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions"
import {useProductsContext} from "./products_context"

const initialState = {
    filteredProducts: [],
    allProducts: [],
    sortedProducts: [],
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        shipping: false,
        price: 309999,
        minPrice: 0,
        maxPrice: 309999,
        layout: "grid",
        sort: null,
    },
}

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
    const {products} = useProductsContext()
    const [state, dispatch] = useReducer(reducer, initialState)

    const filterProducts = () => {
        dispatch({type: FILTER_PRODUCTS})
    }

    const sort = () => {
        dispatch({type: SORT_PRODUCTS})
    }

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: products})
    }, [products])

    useEffect(() => {
        filterProducts()
        sort()
    }, [state.filters])

    const gridView = () => {
        dispatch({type: SET_GRIDVIEW})
    }

    const listView = () => {
        dispatch({type: SET_LISTVIEW})
    }

    const updateFilters = (e) => {
        let value = e.target.value
        let name = e.target.name

        if (name === "category") {
            value = e.target.textContent
        }
        if (name === "color") {
            value = e.target.dataset.color
        }
        if (name === "shipping") {
            value = e.target.checked
        }
        console.log(e.target.value)
        dispatch({type: UPDATE_FILTERS, payload: {name, value}})
    }

    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS})
    }

    const updateSort = (e) => {
        let value = e.target.value
        dispatch({type: UPDATE_SORT, payload: {value}})
    }

    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateFilters,
                clearFilters,
                gridView,
                listView,
                updateSort,
            }}>
            {children}
        </FilterContext.Provider>
    )
}
// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext)
}
