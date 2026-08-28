import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );


            const responseText =
                await response.text();


            let data = {};


            if (responseText) {

                try {

                    data = JSON.parse(
                        responseText
                    );

                } catch {

                    data = {
                        message: responseText
                    };
                }
            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Invalid email or password"
                );
            }


            console.log(
                "Login response:",
                data
            );


            // ==========================================
            // CLEAR OLD LOGIN DATA
            // ==========================================

            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            localStorage.removeItem("user");


            // ==========================================
            // SAVE NEW LOGIN DATA
            // ==========================================

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "name",
                data.name
            );

            localStorage.setItem(
                "email",
                data.email
            );

            localStorage.setItem(
                "role",
                data.role
            );


            // ==========================================
            // SAVE COMPLETE USER INFORMATION
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    role: data.role
                })
            );


            setMessage(
                `Login successful! Welcome ${data.name} 👋`
            );


          const role = localStorage.getItem("role");

if (role === "ADMIN") {
    navigate("/admin");
} else {
    navigate("/dashboard");
}


        } catch (error) {

            setMessage(
                error.message
            );


        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="register-page">

            <div className="register-card">

                <div className="brand">

                    <h1>
                        Interview <span>Prep</span>
                    </h1>

                </div>


                <p className="register-subtitle">
                    Login to continue your
                    interview preparation
                </p>


                <form
                    className="register-form"
                    onSubmit={handleLogin}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>


                {message && (

                    <p className="register-message">
                        {message}
                    </p>

                )}


                <p className="login-link">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;

