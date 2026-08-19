import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    const location = useLocation();

    const role = localStorage.getItem("role");

    const isAdmin = role === "ADMIN";

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                PrepAI
            </div>

            <nav className="sidebar-menu">

                {/* Dashboard */}
                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>🏠</span>
                    Dashboard
                </Link>

                {/* USER MENU */}
                {!isAdmin && (
                    <>
                        <Link
                            to="/practice"
                            className={
                                location.pathname === "/practice"
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <span>💻</span>
                            Practice
                        </Link>

                        <Link
                            to="/mock-interview"
                            className={
                                location.pathname === "/mock-interview"
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <span>🎯</span>
                            Mock Interview
                        </Link>

                        <Link
                            to="/results"
                            className={
                                location.pathname === "/results"
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <span>📊</span>
                            My Results
                        </Link>
                    </>
                )}

                {/* ADMIN MENU */}
                {isAdmin && (
                    <>
                        <Link
                            to="/admin/questions"
                            className={
                                location.pathname === "/admin/questions"
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <span>📝</span>
                            Questions
                        </Link>

                        <Link
                            to="/admin/users"
                            className={
                                location.pathname === "/admin/users"
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <span>👥</span>
                            Users
                        </Link>
                    </>
                )}

            </nav>

        </aside>
    );
}

export default Sidebar;