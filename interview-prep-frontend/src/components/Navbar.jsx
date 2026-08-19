import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/me",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Unable to get user");
            }

            const data = await response.json();

            setUser(data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <nav className="navbar">

            <div className="navbar-brand">

                <div className="navbar-logo">
                    IP
                </div>

                <h2>
                    Interview Prep
                </h2>

            </div>


            {user && (
                <div className="navbar-user">

                    <div className="navbar-user-info">

                        <strong>
                            {user.name}
                        </strong>

                        <span>
                            {user.role}
                        </span>

                    </div>

                    <div className="navbar-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;