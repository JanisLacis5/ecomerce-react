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
    ErrorPage,
} from "./pages"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                errorElement: <ErrorPage />,
                element: <HomePage />,
            },
            {
                path: "about",
                errorElement: <ErrorPage />,
                element: <AboutPage />,
            },
            {
                path: "products",
                errorElement: <ErrorPage />,
                element: <ProductsPage />,
            },
            {
                path: "products/:id",
                errorElement: <ErrorPage />,
                element: <SingleProductPage />,
            },
            {
                path: "cart",
                errorElement: <ErrorPage />,
                element: <CartPage />,
            },
            {
                path: "checkout",
                errorElement: <ErrorPage />,
                element: <CheckoutPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
