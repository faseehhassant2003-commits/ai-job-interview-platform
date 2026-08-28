import API_URL from "../config";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const name =
        localStorage.getItem("name") || "User";


    useEffect(() => {
        fetchDashboard();
    }, []);


    const fetchDashboard = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/dashboard`,
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load dashboard"
                );
            }

            const data =
                await response.json();

            setDashboard(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    if (loading) {

        return (
            <div className="dashboard-page">

                <div className="dashboard-loading">
                    Loading dashboard...
                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="dashboard-page">

                <div className="dashboard-error">
                    {error}
                </div>

            </div>
        );
    }


    return (

        <div className="dashboard-page">

            <div className="dashboard-container">


                {/* =================================
                    WELCOME
                ================================= */}

                <div className="dashboard-welcome">

                    <div>

                        <h1>
                            Welcome back, {name} 👋
                        </h1>

                        <p>
                            Keep practicing and improve
                            your interview skills.
                        </p>

                    </div>


                    <button
                        className="dashboard-practice-btn"
                        onClick={() =>
                            window.location.href =
                                "/practice"
                        }
                    >
                        🚀 Start Practice
                    </button>

                </div>


                {/* =================================
                    STATISTICS
                ================================= */}

                <div className="dashboard-stats">


                    {/* ATTEMPTS */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon green">
                            📝
                        </div>

                        <div>

                            <span>
                                Total Attempts
                            </span>

                            <strong>
                                {dashboard.totalAttempts}
                            </strong>

                        </div>

                    </div>


                    {/* AVERAGE SCORE */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon blue">
                            🎯
                        </div>

                        <div>

                            <span>
                                Average Score
                            </span>

                            <strong>
                                {dashboard.averageScore.toFixed(1)}
                            </strong>

                        </div>

                    </div>


                    {/* ACCURACY */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon purple">
                            📈
                        </div>

                        <div>

                            <span>
                                Average Accuracy
                            </span>

                            <strong>
                                {Math.round(
                                    dashboard.averageAccuracy
                                )}%
                            </strong>

                        </div>

                    </div>


                    {/* QUESTIONS */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon orange">
                            📚
                        </div>

                        <div>

                            <span>
                                Questions Attempted
                            </span>

                            <strong>
                                {dashboard.totalQuestions}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    PERFORMANCE
                ================================= */}

                <div className="performance-section">


                    <div className="performance-card">

                        <h2>
                            Overall Performance
                        </h2>

                        <div className="performance-content">

                            <div className="performance-circle">

                                <strong>
                                    {Math.round(
                                        dashboard.averageAccuracy
                                    )}%
                                </strong>

                                <span>
                                    Accuracy
                                </span>

                            </div>


                            <div className="performance-details">

                                <div>

                                    <span>
                                        Total Questions
                                    </span>

                                    <strong>
                                        {dashboard.totalQuestions}
                                    </strong>

                                </div>


                                <div className="correct-performance">

                                    <span>
                                        Correct Answers
                                    </span>

                                    <strong>
                                        {dashboard.totalCorrect}
                                    </strong>

                                </div>


                                <div className="wrong-performance">

                                    <span>
                                        Wrong Answers
                                    </span>

                                    <strong>
                                        {dashboard.totalWrong}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="quick-actions-card">

                        <h2>
                            Quick Practice
                        </h2>

                        <p>
                            Jump straight into practice.
                        </p>


                        <button
                            onClick={() =>
                                window.location.href =
                                    "/practice"
                            }
                        >
                            💻 Practice Questions
                        </button>


                        <button
                            onClick={() =>
                                window.location.href =
                                    "/history"
                            }
                        >
                            📊 View History
                        </button>

                    </div>

                </div>


                {/* =================================
                    RECENT PRACTICE
                ================================= */}

                <div className="recent-section">

                    <div className="recent-header">

                        <div>

                            <h2>
                                Recent Practice
                            </h2>

                            <p>
                                Your latest practice sessions
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                window.location.href =
                                    "/history"
                            }
                        >
                            View All →
                        </button>

                    </div>


                    {dashboard.recentPractices.length === 0 ? (

                        <div className="no-recent">

                            <div>
                                📚
                            </div>

                            <h3>
                                No practice sessions yet
                            </h3>

                            <p>
                                Start practicing to see
                                your progress here.
                            </p>

                        </div>

                    ) : (

                        <div className="recent-list">

                            {dashboard.recentPractices.map(
                                (practice) => (

                                    <div
                                        className="recent-card"
                                        key={practice.id}
                                    >

                                        <div className="recent-info">

                                            <div className="recent-category">

                                                {practice.category}

                                            </div>

                                            <span className="recent-difficulty">

                                                {practice.difficulty}

                                            </span>

                                            <span className="recent-date">

                                                {formatDate(
                                                    practice.completedAt
                                                )}

                                            </span>

                                        </div>


                                        <div className="recent-result">

                                            <strong>
                                                {practice.correctAnswers}
                                                /
                                                {practice.totalQuestions}
                                            </strong>

                                            <span>
                                                {Math.round(
                                                    practice.accuracy
                                                )}%
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;

