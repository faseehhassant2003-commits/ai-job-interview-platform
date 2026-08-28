import API_URL from "../config";
import { useEffect, useState } from "react";
import "./History.css";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/practice/history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load practice history"
                );
            }

            const data = await response.json();

            setHistory(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const formatDate = (date) => {

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    if (loading) {

        return (
            <div className="history-page">
                <div className="history-loading">
                    Loading history...
                </div>
            </div>
        );
    }


    return (

        <div className="history-page">

            <div className="history-container">

                <div className="history-header">

                    <div>

                        <h1>
                            Practice History
                        </h1>

                        <p>
                            Review your previous practice sessions.
                        </p>

                    </div>

                </div>


                {error && (

                    <div className="history-error">
                        {error}
                    </div>

                )}


                {!error && history.length === 0 && (

                    <div className="empty-history">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h2>
                            No practice history yet
                        </h2>

                        <p>
                            Complete a practice session
                            to see your results here.
                        </p>

                    </div>

                )}


                {history.length > 0 && (

                    <div className="history-list">

                        {history.map((attempt) => (

                            <div
                                className="history-card"
                                key={attempt.id}
                            >

                                <div className="history-main">

                                    <div>

                                        <div className="history-title-row">

                                            <h2>
                                                {attempt.category}
                                            </h2>

                                            <span className="history-difficulty">
                                                {attempt.difficulty}
                                            </span>

                                        </div>

                                        <p className="history-date">
                                            {formatDate(
                                                attempt.completedAt
                                            )}
                                        </p>

                                    </div>

                                </div>


                                <div className="history-stats">

                                    <div className="history-stat">

                                        <strong>
                                            {attempt.correctAnswers}
                                            /
                                            {attempt.totalQuestions}
                                        </strong>

                                        <span>
                                            Score
                                        </span>

                                    </div>


                                    <div className="history-stat">

                                        <strong>
                                            {Math.round(
                                                attempt.accuracy
                                            )}%
                                        </strong>

                                        <span>
                                            Accuracy
                                        </span>

                                    </div>


                                    <div className="history-stat correct-stat">

                                        <strong>
                                            {attempt.correctAnswers}
                                        </strong>

                                        <span>
                                            Correct
                                        </span>

                                    </div>


                                    <div className="history-stat wrong-stat">

                                        <strong>
                                            {attempt.wrongAnswers}
                                        </strong>

                                        <span>
                                            Wrong
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default History;

