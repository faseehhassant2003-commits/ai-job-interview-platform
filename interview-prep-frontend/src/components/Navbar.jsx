import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

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

        navigate("/login");
    };


    return (

        <header className="top-navbar">

            {/* =================================
                BRAND
            ================================= */}

            <Link
                to="/dashboard"
                className="navbar-brand"
            >

                <div className="brand-icon">
                    &lt;/&gt;
                </div>

                <span className="brand-name">
                    Prep<span>AI</span>
                </span>

            </Link>


            {/* =================================
                NAVIGATION
            ================================= */}

            <nav className="navbar-links">

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


                {/* We'll activate this later */}

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


                {/* We'll activate this later */}

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


                {/* ADMIN */}

                {isAdmin && (

                    <Link
                        to="/admin/questions"
                        className={
                            location.pathname.startsWith(
                                "/admin"
                            )
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >

                        <span className="nav-icon">
                            ⚙
                        </span>

                        Admin

                    </Link>

                )}

            </nav>


            {/* =================================
                USER
            ================================= */}

            <div className="navbar-user">

                <div className="user-avatar">

                    {name
                        .charAt(0)
                        .toUpperCase()}

                </div>


                <div className="user-details">

                    <strong>
                        {name}
                    </strong>

                    <span>
                        {role}
                    </span>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                    title="Logout"
                >
                    ⋯
                </button>

            </div>

        </header>
    );
}

export default Navbar;