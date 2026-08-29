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

            // =====================================================
            // LOGIN REQUEST
            // =====================================================

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );


            // =====================================================
            // READ RESPONSE
            // =====================================================

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


            // =====================================================
            // LOGIN FAILED
            // =====================================================

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


            // =====================================================
            // CLEAR OLD LOGIN DATA
            // =====================================================

            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            localStorage.removeItem("user");


            // =====================================================
            // SAVE TOKEN
            // =====================================================

            localStorage.setItem(
                "token",
                data.token
            );


            // =====================================================
            // SAVE USER INFORMATION
            // =====================================================

            localStorage.setItem(
                "name",
                data.name || ""
            );

            localStorage.setItem(
                "email",
                data.email || email
            );

            localStorage.setItem(
                "role",
                data.role || "USER"
            );


            // =====================================================
            // SAVE COMPLETE USER OBJECT
            // =====================================================

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.name || "",
                    email: data.email || email,
                    role: data.role || "USER"
                })
            );


            // =====================================================
            // GET ROLE
            // =====================================================

            const role =
                data.role ||
                localStorage.getItem("role") ||
                "USER";


            console.log(
                "Logged in role:",
                role
            );


            // =====================================================
            // SUCCESS MESSAGE
            // =====================================================

            setMessage(
                `Login successful! Welcome ${
                    data.name || ""
                } 👋`
            );


            // =====================================================
            // REDIRECT
            // =====================================================

            if (
                role.toUpperCase() === "ADMIN"
            ) {

                navigate("/admin");

            } else {

                navigate("/dashboard");
            }


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setMessage(
                error.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="register-page">

            <div className="register-card">

                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="brand">

                    <h1>
                        Interview <span>Prep</span>
                    </h1>

                </div>


                {/* =================================================
                    SUBTITLE
                ================================================= */}

                <p className="register-subtitle">

                    Login to continue your
                    interview preparation

                </p>


                {/* =================================================
                    LOGIN FORM
                ================================================= */}

                <form
                    className="register-form"
                    onSubmit={handleLogin}
                >

                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (

                    <p className="register-message">

                        {message}

                    </p>

                )}


                {/* =================================================
                    REGISTER LINK
                ================================================= */}

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