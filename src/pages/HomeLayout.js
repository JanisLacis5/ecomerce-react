import {Outlet} from "react-router-dom"
import {Footer, Navbar, Sidebar} from "../components"

const HomeLayout = () => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <Sidebar />
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    )
}
export default HomeLayout
