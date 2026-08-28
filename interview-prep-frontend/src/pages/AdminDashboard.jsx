import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const name =
        localStorage.getItem("name") || "Admin";

    useEffect(() => {

        const fetchQuestions = async () => {

            try {

                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                const response = await fetch(
                    `${API_URL}/api/admin/questions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load questions"
                    );
                }

                const data = await response.json();

                setQuestions(
                    Array.isArray(data)
                        ? data
                        : data.content || []
                );

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load dashboard statistics."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchQuestions();

    }, []);


    const statistics = useMemo(() => {

        let mcq = 0;
        let coding = 0;
        let descriptive = 0;

        const categories = new Set();

        questions.forEach((question) => {

            const type = String(
                question.type ||
                question.questionType ||
                ""
            ).toUpperCase();

            if (
                type.includes("MCQ") ||
                type.includes("MULTIPLE")
            ) {
                mcq++;
            }
            else if (
                type.includes("CODING") ||
                type.includes("CODE")
            ) {
                coding++;
            }
            else if (
                type.includes("DESCRIPTIVE") ||
                type.includes("SUBJECTIVE")
            ) {
                descriptive++;
            }

            const category =
                question.category?.name ||
                question.categoryName ||
                question.category;

            if (category) {
                categories.add(
                    typeof category === "object"
                        ? category.name
                        : category
                );
            }

        });

        return {
            total: questions.length,
            mcq,
            coding,
            descriptive,
            categories: categories.size
        };

    }, [questions]);


    return (

        <div className="admin-dashboard">

            {/* HEADER */}

            <div className="admin-dashboard-header">

                <div>
                    <p className="admin-dashboard-label">
                        ADMIN PANEL
                    </p>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p className="admin-dashboard-subtitle">
                        Welcome back, {name}. Manage and
                        monitor your PrepAI platform.
                    </p>
                </div>

                <div className="admin-dashboard-admin-badge">
                    <span>⚙</span>
                    Administrator
                </div>

            </div>


            {/* ERROR */}

            {error && (
                <div className="admin-dashboard-error">
                    {error}
                </div>
            )}


            {/* STATISTICS */}

            <div className="admin-stat-grid">

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📚
                    </div>

                    <div>
                        <span>
                            Total Questions
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : statistics.total}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📝
                    </div>

                    <div>
                        <span>
                            MCQ Questions
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : statistics.mcq}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        💻
                    </div>

                    <div>
                        <span>
                            Coding Questions
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : statistics.coding}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📖
                    </div>

                    <div>
                        <span>
                            Descriptive
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : statistics.descriptive}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🏷️
                    </div>

                    <div>
                        <span>
                            Categories
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : statistics.categories}
                        </strong>
                    </div>

                </div>

            </div>


            {/* MANAGEMENT */}

            <section className="admin-management">

                <div className="admin-section-heading">

                    <div>
                        <h2>
                            Question Management
                        </h2>

                        <p>
                            Manage the interview question
                            bank used by PrepAI.
                        </p>
                    </div>

                    <span className="admin-question-count">
                        {loading
                            ? "Loading..."
                            : `${statistics.total} questions`}
                    </span>

                </div>


                <div className="admin-management-grid">

                    {/* MANAGE QUESTIONS */}

                    <Link
                        to="/admin/questions"
                        className="admin-management-card"
                    >

                        <div className="admin-management-icon">
                            📋
                        </div>

                        <div>

                            <h3>
                                Manage Questions
                            </h3>

                            <p>
                                View, edit and delete
                                interview questions.
                            </p>

                            <span>
                                Open Question Manager →
                            </span>

                        </div>

                    </Link>


                    {/* ADD QUESTION */}

                    <Link
                        to="/admin/questions"
                        className="admin-management-card"
                    >

                        <div className="admin-management-icon">
                            ➕
                        </div>

                        <div>

                            <h3>
                                Add Question
                            </h3>

                            <p>
                                Create a new interview
                                question for the platform.
                            </p>

                            <span>
                                Add New Question →
                            </span>

                        </div>

                    </Link>


                    {/* IMPORT */}

                    <Link
                        to="/admin/questions"
                        className="admin-management-card"
                    >

                        <div className="admin-management-icon">
                            📥
                        </div>

                        <div>

                            <h3>
                                Bulk Import
                            </h3>

                            <p>
                                Import multiple questions
                                using a CSV file.
                            </p>

                            <span>
                                Import Questions →
                            </span>

                        </div>

                    </Link>

                </div>

            </section>


            {/* QUICK INFO */}

            <section className="admin-info-section">

                <div className="admin-info-card">

                    <div className="admin-info-icon">
                        💡
                    </div>

                    <div>

                        <h3>
                            Question Bank Overview
                        </h3>

                        <p>
                            Your question bank currently
                            contains{" "}
                            <strong>
                                {loading
                                    ? "..."
                                    : statistics.total}
                            </strong>{" "}
                            questions across{" "}
                            <strong>
                                {loading
                                    ? "..."
                                    : statistics.categories}
                            </strong>{" "}
                            categories.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default AdminDashboard;