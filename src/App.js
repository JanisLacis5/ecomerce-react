import React from "react"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    HomeLayout,
    HomePage,
    AboutPage,
    ProductsPage,
    SingleProductPage,
    CartPage,
    CheckoutPage,
} from "./pages"
import {Error} from "./components"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                errorElement: <Error />,
                element: <HomePage />,
            },
            {
                path: "about",
                errorElement: <Error />,
                element: <AboutPage />,
            },
            {
                path: "products",
                errorElement: <Error />,
                element: <ProductsPage />,
            },
            {
                path: "products/:id",
                errorElement: <Error />,
                element: <SingleProductPage />,
            },
            {
                path: "cart",
                errorElement: <Error />,
                element: <CartPage />,
            },
            {
                path: "checkout",
                errorElement: <Error />,
                element: <CheckoutPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
