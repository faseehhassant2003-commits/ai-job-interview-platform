import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout() {
    return (
        <div className="app-layout">

            <Navbar />

            <main className="page-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;