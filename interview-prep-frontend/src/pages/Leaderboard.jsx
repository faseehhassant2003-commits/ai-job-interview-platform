import { useEffect, useState } from "react";
import "./Leaderboard.css";

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentEmail =
        localStorage.getItem("email");


    useEffect(() => {
        fetchLeaderboard();
    }, []);


    const fetchLeaderboard = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/leaderboard",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load leaderboard"
                );
            }

            const data = await response.json();

            setLeaderboard(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const getRankIcon = (rank) => {

        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";

        return rank;
    };


    if (loading) {

        return (
            <div className="leaderboard-page">

                <div className="leaderboard-loading">
                    Loading leaderboard...
                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="leaderboard-page">

                <div className="leaderboard-error">
                    {error}
                </div>

            </div>
        );
    }


    return (

        <div className="leaderboard-page">

            <div className="leaderboard-container">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="leaderboard-header">

                    <h1>
                        Leaderboard
                    </h1>

                    <p>
                        See how you compare with
                        other PrepAI users.
                    </p>

                </div>


                {/* =========================
                    TOP 3
                ========================= */}

                {leaderboard.length > 0 && (

                    <div className="top-three">

                        {leaderboard
                            .slice(0, 3)
                            .map((user) => (

                                <div
                                    key={user.email}
                                    className={
                                        user.rank === 1
                                            ? "top-user first"
                                            : "top-user"
                                    }
                                >

                                    <div className="top-rank">

                                        {getRankIcon(
                                            user.rank
                                        )}

                                    </div>

                                    <div className="top-avatar">

                                        {user.name
                                            .charAt(0)
                                            .toUpperCase()}

                                    </div>

                                    <h2>
                                        {user.name}
                                    </h2>

                                    <strong>
                                        {Math.round(
                                            user.averageAccuracy
                                        )}%
                                    </strong>

                                    <span>
                                        Accuracy
                                    </span>

                                </div>

                            ))}

                    </div>

                )}


                {/* =========================
                    TABLE
                ========================= */}

                <div className="leaderboard-card">

                    {leaderboard.length === 0 ? (

                        <div className="leaderboard-empty">

                            <div>
                                🏆
                            </div>

                            <h2>
                                No rankings yet
                            </h2>

                            <p>
                                Complete some practice
                                sessions to appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="leaderboard-table-wrapper">

                            <table className="leaderboard-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Rank
                                        </th>

                                        <th>
                                            User
                                        </th>

                                        <th>
                                            Attempts
                                        </th>

                                        <th>
                                            Questions
                                        </th>

                                        <th>
                                            Correct
                                        </th>

                                        <th>
                                            Accuracy
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {leaderboard.map(
                                        (user) => {

                                            const isCurrentUser =
                                                user.email ===
                                                currentEmail;

                                            return (

                                                <tr
                                                    key={
                                                        user.email
                                                    }
                                                    className={
                                                        isCurrentUser
                                                            ? "current-user"
                                                            : ""
                                                    }
                                                >

                                                    <td>

                                                        <span className="rank-number">

                                                            {getRankIcon(
                                                                user.rank
                                                            )}

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="leader-user">

                                                            <div className="leader-avatar">

                                                                {user.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}

                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {user.name}
                                                                </strong>

                                                                {isCurrentUser && (

                                                                    <span className="you-badge">
                                                                        YOU
                                                                    </span>

                                                                )}

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>
                                                        {user.totalAttempts}
                                                    </td>


                                                    <td>
                                                        {user.totalQuestions}
                                                    </td>


                                                    <td>
                                                        {user.totalCorrect}
                                                    </td>


                                                    <td>

                                                        <strong className="accuracy-value">

                                                            {Math.round(
                                                                user.averageAccuracy
                                                            )}%

                                                        </strong>

                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Leaderboard;