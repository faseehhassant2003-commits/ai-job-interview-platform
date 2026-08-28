import API_URL from "../config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");


        // ================================================
        // PASSWORD CHECK
        // ================================================

        if (password !== confirmPassword) {

            setMessage(
                "Passwords do not match"
            );

            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data || "Registration failed"
                );
            }


            // ============================================
            // SAVE EMAIL TEMPORARILY
            // ============================================

            localStorage.setItem(
                "verificationEmail",
                email
            );


            // ============================================
            // GO TO OTP PAGE
            // ============================================

            navigate("/verify-otp");


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
                    Create your account and start
                    preparing for interviews
                </p>


                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                        />

                    </div>


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
                            placeholder="Enter your email address"
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
                            placeholder="Create a password"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending OTP..."
                            : "Create Account"}

                    </button>

                </form>


                {message && (

                    <p className="register-message">
                        {message}
                    </p>

                )}


                <p className="login-link">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;


