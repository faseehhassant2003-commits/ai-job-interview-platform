import { Link } from "react-router-dom";
import "../App.css";
import "./Introduction.css";

function Introduction() {
    return (
        <div className="intro-page">

            {/* ================= NAVBAR ================= */}

            <nav className="intro-navbar">

                <div className="intro-logo">
                    Interview <span>Prep</span>
                </div>

                <div className="intro-nav-buttons">

                    <Link
                        to="/login"
                        className="intro-login-btn"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="intro-register-btn"
                    >
                        Register
                    </Link>

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section className="intro-hero">

                <div className="intro-content">

                    <div className="intro-badge">
                        AI-Powered Interview Preparation
                    </div>

                    <h1>
                        Prepare Smarter.
                        <br />
                        <span>Interview Better.</span>
                    </h1>

                    <p>
                        Get ready for your next interview with
                        AI-powered practice, personalized questions,
                        and intelligent feedback designed to help
                        you build confidence and improve your
                        interview skills.
                    </p>


                    <div className="intro-actions">

                        <Link
                            to="/register"
                            className="intro-primary-btn"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="intro-secondary-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>


                {/* AI CARD */}

                <div className="intro-visual">

                    <div className="ai-card">

                        <div className="ai-card-header">

                            <div className="ai-icon">
                                AI
                            </div>

                            <div>
                                <h3>
                                    AI Interview Coach
                                </h3>

                                <p>
                                    Your personal interview assistant
                                </p>
                            </div>

                        </div>


                        <div className="ai-question">

                            <span>
                                Interview Question
                            </span>

                            <p>
                                "Tell me about yourself and
                                your experience."
                            </p>

                        </div>


                        <div className="ai-progress">

                            <div className="progress-label">

                                <span>
                                    Interview Preparation
                                </span>

                                <span>
                                    85%
                                </span>

                            </div>

                            <div className="progress-bar">

                                <div className="progress-fill"></div>

                            </div>

                        </div>


                        <div className="ai-stats">

                            <div>
                                <strong>25+</strong>
                                <span>Questions</span>
                            </div>

                            <div>
                                <strong>AI</strong>
                                <span>Feedback</span>
                            </div>

                            <div>
                                <strong>24/7</strong>
                                <span>Practice</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="intro-features">

                <div className="feature">

                    <div className="feature-icon">
                        🤖
                    </div>

                    <h3>
                        AI-Powered Practice
                    </h3>

                    <p>
                        Practice realistic interview questions
                        with intelligent AI assistance.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        🎯
                    </div>

                    <h3>
                        Personalized Preparation
                    </h3>

                    <p>
                        Prepare based on your skills, role,
                        and interview requirements.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        📊
                    </div>

                    <h3>
                        Track Your Progress
                    </h3>

                    <p>
                        Improve your performance by tracking
                        your interview preparation.
                    </p>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section className="intro-section">

                <div className="section-heading">

                    <span className="section-label">
                        HOW IT WORKS
                    </span>

                    <h2>
                        Prepare for interviews
                        <span> step by step.</span>
                    </h2>

                    <p>
                        Interview Prep makes your preparation
                        simple, focused, and effective.
                    </p>

                </div>


                <div className="steps-container">

                    <div className="step-card">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Create Your Account
                        </h3>

                        <p>
                            Register and create your personal
                            interview preparation profile.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Choose Your Practice
                        </h3>

                        <p>
                            Select questions and topics based
                            on your interview requirements.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Practice With AI
                        </h3>

                        <p>
                            Answer questions and receive
                            intelligent feedback to improve.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            04
                        </div>

                        <h3>
                            Track Your Progress
                        </h3>

                        <p>
                            Review your performance and continue
                            improving your interview skills.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= WHY INTERVIEW PREP ================= */}

            <section className="why-section">

                <div className="why-content">

                    <span className="section-label">
                        WHY INTERVIEW PREP?
                    </span>

                    <h2>
                        Everything you need to
                        <span> prepare with confidence.</span>
                    </h2>

                    <p>
                        Preparing for an interview should not feel
                        overwhelming. Interview Prep brings your
                        practice, questions, feedback, and progress
                        together in one place.
                    </p>

                </div>


                <div className="why-list">

                    <div className="why-item">

                        <div className="check">
                            ✓
                        </div>

                        <div>
                            <h3>
                                Practice Anytime
                            </h3>

                            <p>
                                Prepare whenever you have time,
                                from anywhere.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="check">
                            ✓
                        </div>

                        <div>
                            <h3>
                                Improve Your Answers
                            </h3>

                            <p>
                                Practice answering common
                                interview questions effectively.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="check">
                            ✓
                        </div>

                        <div>
                            <h3>
                                Build Confidence
                            </h3>

                            <p>
                                Consistent practice helps you
                                approach interviews with confidence.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="check">
                            ✓
                        </div>

                        <div>
                            <h3>
                                Monitor Your Progress
                            </h3>

                            <p>
                                Keep track of your preparation and
                                continue improving.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PRACTICE AREAS ================= */}

            <section className="practice-section">

                <div className="section-heading">

                    <span className="section-label">
                        PRACTICE AREAS
                    </span>

                    <h2>
                        Prepare for different
                        <span> interview challenges.</span>
                    </h2>

                    <p>
                        Build stronger answers across the areas
                        that matter during an interview.
                    </p>

                </div>


                <div className="practice-grid">

                    <div className="practice-card">

                        <div className="practice-icon">
                            💻
                        </div>

                        <h3>
                            Technical Questions
                        </h3>

                        <p>
                            Practice technical questions and
                            strengthen your problem-solving skills.
                        </p>

                    </div>


                    <div className="practice-card">

                        <div className="practice-icon">
                            🗣️
                        </div>

                        <h3>
                            HR & Behavioral
                        </h3>

                        <p>
                            Prepare answers for common HR and
                            behavioral interview questions.
                        </p>

                    </div>


                    <div className="practice-card">

                        <div className="practice-icon">
                            🎓
                        </div>

                        <h3>
                            Fresher Interviews
                        </h3>

                        <p>
                            Build confidence and prepare for
                            your first professional interview.
                        </p>

                    </div>


                    <div className="practice-card">

                        <div className="practice-icon">
                            🚀
                        </div>

                        <h3>
                            Career Preparation
                        </h3>

                        <p>
                            Improve your overall interview
                            readiness and communication.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="intro-cta">

                <div>

                    <h2>
                        Ready to prepare for your
                        <span> next interview?</span>
                    </h2>

                    <p>
                        Start practicing today and take the
                        next step toward interview success.
                    </p>

                </div>


                <Link
                    to="/register"
                    className="cta-button"
                >
                    Start Preparing
                </Link>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="intro-footer">

                <div className="footer-logo">
                    Interview <span>Prep</span>
                </div>

                <p>
                    AI-powered interview preparation
                    designed to help you succeed.
                </p>

                <div className="footer-line"></div>

                <p className="copyright">
                    © 2026 Interview Prep. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Introduction;