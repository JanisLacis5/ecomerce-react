import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions"

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        return {
            ...state,
            allProducts: [...action.payload],
            filteredProducts: [...action.payload],
            sortedProducts: [...action.payload],
        }
    }

    if (action.type === SET_GRIDVIEW) {
        return {
            ...state,
            filters: {
                ...state.filters,
                layout: "grid",
            },
        }
    }

    if (action.type === SET_LISTVIEW) {
        return {
            ...state,
            filters: {
                ...state.filters,
                layout: "list",
            },
        }
    }

    if (action.type === UPDATE_FILTERS) {
        const {name, value} = action.payload
        return {...state, filters: {...state.filters, [name]: value}}
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filters,
                text: "",
                category: "all",
                company: "all",
                color: "all",
                shipping: false,
                price: 309999,
            },
        }
    }

    if (action.type === FILTER_PRODUCTS) {
        let ansArr = [...state.allProducts]
        if (state.filters.text !== "") {
            ansArr = ansArr.filter((item) =>
                item.name.toLowerCase().startsWith(state.filters.text)
            )
        }
        if (state.filters.category !== "all") {
            ansArr = ansArr.filter(
                (item) => item.category === state.filters.category
            )
        }
        if (state.filters.company !== "all") {
            ansArr = ansArr.filter(
                (item) => item.company === state.filters.company
            )
        }
        if (state.filters.color !== "all") {
            ansArr = ansArr.filter((item) =>
                item.colors.includes(state.filters.color)
            )
        }
        if (state.filters.price !== state.filters.maxPrice) {
            ansArr = ansArr.filter((item) => item.price <= state.filters.price)
        }
        if (state.filters.shipping) {
            ansArr = ansArr.filter((item) => item.shipping)
        }
        return {...state, filteredProducts: [...ansArr]}
    }

    if (action.type === SORT_PRODUCTS) {
        let newArr = [...state.filteredProducts]
        if (state.filters.sort === "priceLowest") {
            newArr = newArr.sort((a, b) => a.price - b.price)
        }
        if (state.filters.sort === "priceHighest") {
            newArr = newArr.sort((a, b) => b.price - a.price)
        }
        if (state.filters.sort === "nameA") {
            newArr = newArr.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (state.filters.sort === "nameZ") {
            newArr = newArr.sort((a, b) => b.name.localeCompare(a.name))
        }
        return {...state, filteredProducts: newArr}
    }

    if (action.type === UPDATE_SORT) {
        return {
            ...state,
            filters: {...state.filters, sort: action.payload.value},
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
