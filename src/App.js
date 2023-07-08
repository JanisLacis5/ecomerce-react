import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import {
    HomeLayout,
    HomePage,
    AboutPage,
    ProductsPage,
    SingleProductPage,
    CartPage,
} from "./pages"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                errorElement: <h1>Error</h1>,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "products/:id",
                element: <SingleProductPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
