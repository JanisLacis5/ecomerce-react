import axios from "axios"
import {useContext, useEffect, useReducer, createContext} from "react"
import reducer from "../reducers/products_reducer"
import {products_url} from "../utils/constants"
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
} from "../actions"

const initialState = {
	isSidebarOpen: false,
	products: [],
	featuredProducts: [],
	productsLoading: false,
	productsLoadingError: false,
	singleProductLoading: false,
	singleProduct: {},
}

const ProductsContext = createContext()
export const useProductsContext = () => useContext(ProductsContext)

export const ProductsProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const openSidebar = () => {
		dispatch({type: SIDEBAR_OPEN})
	}
	const closeSidebar = () => {
		dispatch({type: SIDEBAR_CLOSE})
	}
	const fetchProducts = async (products_url) => {
		dispatch({type: GET_PRODUCTS_BEGIN})
		try {
			const {data} = await axios.get(products_url)
			dispatch({type: GET_PRODUCTS_SUCCESS, payload: {data}})
		} catch (error) {
			dispatch({type: GET_PRODUCTS_ERROR, payload: {error}})
		}
	}
	const getProduct = async (products_url, id) => {
		dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
		try {
			const {data} = await axios.get(`${products_url}${id}`)
			dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: {data}})
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchProducts(products_url)
	}, [])

	return (
		<ProductsContext.Provider
			value={{...state, openSidebar, closeSidebar, getProduct}}
		>
			{children}
		</ProductsContext.Provider>
	)
}
