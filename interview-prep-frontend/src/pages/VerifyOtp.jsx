import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);


    useEffect(() => {

        const savedEmail =
            localStorage.getItem(
                "verificationEmail"
            );


        if (!savedEmail) {

            navigate("/register");

            return;
        }


        setEmail(savedEmail);

    }, [navigate]);


    // ==================================================
    // VERIFY OTP
    // ==================================================

    const handleVerify = async (e) => {

        e.preventDefault();

        setMessage("");

        if (otp.length !== 6) {

            setMessage(
                "Please enter the 6-digit OTP."
            );

            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                `http://localhost:8080/api/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
                {
                    method: "POST",
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data || "OTP verification failed"
                );
            }


            localStorage.removeItem(
                "verificationEmail"
            );


            setMessage(
                "Email verified successfully! 🎉"
            );


            setTimeout(() => {

                navigate("/login");

            }, 1200);


        } catch (error) {

            setMessage(
                error.message
            );

        } finally {

            setLoading(false);
        }
    };


    // ==================================================
    // RESEND OTP
    // ==================================================

    const handleResend = async () => {

        setMessage("");
        setResending(true);


        try {

            const response = await fetch(
                `http://localhost:8080/api/auth/resend-otp?email=${encodeURIComponent(email)}`,
                {
                    method: "POST",
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data || "Unable to resend OTP"
                );
            }


            setMessage(
                "A new OTP has been sent to your email."
            );


        } catch (error) {

            setMessage(
                error.message
            );

        } finally {

            setResending(false);
        }
    };


    return (

        <div className="register-page">

            <div className="register-card">

                <div className="brand">

                    <h1>
                        Prep<span>AI</span>
                    </h1>

                </div>


                <h2>
                    Verify Your Email
                </h2>


                <p className="register-subtitle">

                    We sent a 6-digit verification
                    code to:

                    <br />

                    <strong>
                        {email}
                    </strong>

                </p>


                <form
                    className="register-form"
                    onSubmit={handleVerify}
                >

                    <div className="form-group">

                        <label>
                            Verification Code
                        </label>

                        <input
                            type="text"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6)
                                )
                            }
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            inputMode="numeric"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Verifying..."
                            : "Verify Email"}

                    </button>

                </form>


                {message && (

                    <p className="register-message">
                        {message}
                    </p>

                )}


                <button
                    type="button"
                    className="register-button"
                    onClick={handleResend}
                    disabled={resending}
                    style={{
                        marginTop: "12px",
                        background: "white",
                        color: "#168b58",
                        border: "1px solid #168b58"
                    }}
                >

                    {resending
                        ? "Sending..."
                        : "Resend OTP"}

                </button>


                <p className="login-link">

                    Wrong email?{" "}

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        style={{
                            cursor: "pointer",
                            color: "#168b58",
                            fontWeight: "600"
                        }}
                    >
                        Register again
                    </span>

                </p>

            </div>

        </div>
    );
}

export default VerifyOtp;