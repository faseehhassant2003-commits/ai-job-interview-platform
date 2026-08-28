import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { useState } from "react";

import "./Navbar.css";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const name =
        localStorage.getItem("name") || "User";

    const role =
        localStorage.getItem("role") || "MEMBER";

    const isAdmin = role === "ADMIN";


    const isActive = (path) => {
        return location.pathname === path;
    };


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        setMenuOpen(false);

        navigate("/login");
    };


    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (

        <header className="top-navbar">

            {/* =================================
                BRAND
            ================================= */}

            <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="navbar-brand"
                onClick={closeMenu}
            >

                <div className="brand-icon">
                    &lt;/&gt;
                </div>

                <span className="brand-name">
                    Prep<span>AI</span>
                </span>

            </Link>


            {/* =================================
                DESKTOP NAVIGATION
            ================================= */}

            <nav className="navbar-links">

                {isAdmin ? (

                    /* =============================
                       ADMIN NAVIGATION
                    ============================= */

                    <>
                        <Link
                            to="/admin"
                            className={
                                isActive("/admin")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ▣
                            </span>

                            Admin Dashboard
                        </Link>


                        <Link
                            to="/admin/questions"
                            className={
                                isActive("/admin/questions")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ▤
                            </span>

                            Questions
                        </Link>
                    </>

                ) : (

                    /* =============================
                       USER NAVIGATION
                    ============================= */

                    <>
                        <Link
                            to="/dashboard"
                            className={
                                isActive("/dashboard")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ▣
                            </span>

                            Dashboard
                        </Link>


                        <Link
                            to="/practice"
                            className={
                                isActive("/practice")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ▤
                            </span>

                            Practice
                        </Link>


                        <Link
                            to="/ai-interview"
                            className={
                                isActive("/ai-interview")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                🤖
                            </span>

                            AI Interview
                        </Link>


                        <Link
                            to="/history"
                            className={
                                isActive("/history")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ◷
                            </span>

                            History
                        </Link>


                        <Link
                            to="/leaderboard"
                            className={
                                isActive("/leaderboard")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span className="nav-icon">
                                ♛
                            </span>

                            Leaderboard
                        </Link>
                    </>

                )}

            </nav>


            {/* =================================
                DESKTOP USER
            ================================= */}

            <div className="navbar-user">

                <div className="user-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>


                <div className="user-details">

                    <strong>
                        {name}
                    </strong>

                    <span>
                        {isAdmin
                            ? "ADMIN"
                            : role}
                    </span>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                    title="Logout"
                >
                    ⇥
                </button>

            </div>


            {/* =================================
                MOBILE MENU BUTTON
            ================================= */}

            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? "✕" : "☰"}
            </button>


            {/* =================================
                MOBILE MENU
            ================================= */}

            {menuOpen && (

                <div className="mobile-menu">

                    {/* MOBILE USER */}

                    <div className="mobile-user">

                        <div className="mobile-user-avatar">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <strong>
                                {name}
                            </strong>

                            <span>
                                {isAdmin
                                    ? "ADMIN"
                                    : role}
                            </span>

                        </div>

                    </div>


                    {/* MOBILE LINKS */}

                    <div className="mobile-menu-links">

                        {isAdmin ? (

                            <>
                                <Link
                                    to="/admin"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/admin")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>▣</span>
                                    Admin Dashboard
                                </Link>


                                <Link
                                    to="/admin/questions"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/admin/questions")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>▤</span>
                                    Questions
                                </Link>
                            </>

                        ) : (

                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/dashboard")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>▣</span>
                                    Dashboard
                                </Link>


                                <Link
                                    to="/practice"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/practice")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>▤</span>
                                    Practice
                                </Link>


                                <Link
                                    to="/ai-interview"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/ai-interview")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>🤖</span>
                                    AI Interview
                                </Link>


                                <Link
                                    to="/history"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/history")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>◷</span>
                                    History
                                </Link>


                                <Link
                                    to="/leaderboard"
                                    onClick={closeMenu}
                                    className={
                                        isActive("/leaderboard")
                                            ? "mobile-nav-link active"
                                            : "mobile-nav-link"
                                    }
                                >
                                    <span>♛</span>
                                    Leaderboard
                                </Link>
                            </>

                        )}

                    </div>


                    {/* MOBILE LOGOUT */}

                    <button
                        className="mobile-logout"
                        onClick={handleLogout}
                    >
                        ⇥
                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            )}

        </header>
    );
}

export default Navbar;