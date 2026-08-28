import { useState } from "react";
import "./AIInterview.css";

function AIInterview() {

    // =====================================================
    // SETUP STATE
    // =====================================================

    const [category, setCategory] =
        useState("Java");

    const [difficulty, setDifficulty] =
        useState("MEDIUM");

    const [interviewType, setInterviewType] =
        useState("Technical");

    const [questionCount, setQuestionCount] =
        useState(5);


    // =====================================================
    // INTERVIEW STATE
    // =====================================================

    const [started, setStarted] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [evaluating, setEvaluating] =
        useState(false);

    const [error, setError] =
        useState("");

    const [interview, setInterview] =
        useState(null);

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState(null);

    const [questionNumber, setQuestionNumber] =
        useState(1);


    // =====================================================
    // START AI INTERVIEW
    // =====================================================

    const startInterview = async () => {

        setError("");
        setLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {

                throw new Error(
                    "You are not logged in. Please login again."
                );
            }


            const response =
                await fetch(
                    "http://localhost:8080/api/ai-interview/start",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`,

                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({

                            topic:
                                category,

                            difficulty:
                                difficulty,

                            interviewType:
                                interviewType,

                            numberOfQuestions:
                                Number(questionCount)

                        })
                    }
                );


            let data = null;

            try {

                data =
                    await response.json();

            } catch {

                data = null;

            }


            if (!response.ok) {

                if (response.status === 401) {

                    throw new Error(
                        "Your login session has expired. Please login again."
                    );

                }

                if (response.status === 403) {

                    throw new Error(
                        "Access denied. Please login again and try."
                    );

                }

                if (typeof data === "string") {

                    throw new Error(data);

                }

                if (
                    data &&
                    data.message
                ) {

                    throw new Error(
                        data.message
                    );

                }

                throw new Error(
                    `Failed to start interview (${response.status})`
                );

            }


            console.log(
                "AI interview started:",
                data
            );


            setInterview(data);

            setStarted(true);

            setAnswer("");

            setEvaluation(null);

            setQuestionNumber(1);


        } catch (error) {

            console.error(
                "AI interview error:",
                error
            );

            setError(
                error.message ||
                "Failed to start AI interview."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const submitAnswer = async () => {

        setError("");

        if (!answer.trim()) {

            setError(
                "Please write your answer before submitting."
            );

            return;
        }


        setEvaluating(true);


        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                throw new Error(
                    "You are not logged in. Please login again."
                );

            }


            const question =
                getInterviewMessage(interview);


            const response =
                await fetch(
                    "http://localhost:8080/api/ai-interview/evaluate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`,

                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({

                            question:
                                question,

                            answer:
                                answer,

                            topic:
                                category,

                            difficulty:
                                difficulty,

                            interviewType:
                                interviewType,

                            questionNumber:
                                questionNumber,

                            totalQuestions:
                                Number(questionCount)

                        })
                    }
                );


            let data = null;

            try {

                data =
                    await response.json();

            } catch {

                data = null;

            }


            if (!response.ok) {

                if (response.status === 401) {

                    throw new Error(
                        "Your login session has expired. Please login again."
                    );

                }

                if (response.status === 403) {

                    throw new Error(
                        "Access denied. Please login again. "
                    );

                }

                if (
                    data &&
                    data.message
                ) {

                    throw new Error(
                        data.message
                    );

                }

                throw new Error(
                    `Failed to evaluate answer (${response.status})`
                );

            }


            console.log(
                "AI evaluation:",
                data
            );


            const parsedEvaluation =
                parseEvaluation(data);


            setEvaluation(
                parsedEvaluation
            );


        } catch (error) {

            console.error(
                "Answer evaluation error:",
                error
            );

            setError(
                error.message ||
                "Failed to evaluate answer."
            );

        } finally {

            setEvaluating(false);

        }

    };


    // =====================================================
    // NEXT QUESTION
    // =====================================================

    const nextQuestion = () => {

        setError("");


        const nextNumber =
            questionNumber + 1;


        /*
         * If all questions are completed,
         * don't generate another question.
         */

        if (
            nextNumber >
            Number(questionCount)
        ) {

            setError(
                "You have completed the interview."
            );

            return;
        }


        /*
         * The backend evaluation now contains
         * the context-aware follow-up question.
         */

        const followUpQuestion =
            evaluation?.followUpQuestion;


        if (
            !followUpQuestion ||
            !followUpQuestion.trim()
        ) {

            setError(
                "The AI did not generate a follow-up question."
            );

            return;
        }


        /*
         * Put the AI follow-up question directly
         * into the current interview state.
         */

        setInterview({

            question:
                followUpQuestion

        });


        setQuestionNumber(
            nextNumber
        );


        setAnswer("");

        setEvaluation(null);

    };


    // =====================================================
    // RESTART
    // =====================================================

    const restartInterview = () => {

        setInterview(null);

        setStarted(false);

        setLoading(false);

        setEvaluating(false);

        setError("");

        setAnswer("");

        setEvaluation(null);

        setQuestionNumber(1);

    };


    // =====================================================
    // INTERVIEW SCREEN
    // =====================================================

    if (started) {

        return (

            <div className="ai-interview-page">

                <div className="ai-interview-container">

                    {/* =====================================
                        HEADER
                        ===================================== */}

                    <div className="ai-interview-header">

                        <div>

                            <h1>
                                AI Interview
                            </h1>

                            <p>
                                Your AI interviewer is ready.
                            </p>

                        </div>

                        <div className="ai-badge">
                            🤖 AI
                        </div>

                    </div>


                    {/* =====================================
                        QUESTION PROGRESS
                        ===================================== */}

                    <div className="ai-question-progress">

                        Question {questionNumber} of {questionCount}

                    </div>


                    {/* =====================================
                        AI QUESTION
                        ===================================== */}

                    <div className="ai-interview-card">

                        <div className="ai-avatar">
                            🤖
                        </div>


                        <div className="ai-message">

                            <h2>
                                AI Interviewer
                            </h2>


                            <p>

                                {getInterviewMessage(
                                    interview
                                )}

                            </p>

                        </div>

                    </div>


                    {/* =====================================
                        INTERVIEW DETAILS
                        ===================================== */}

                    <div className="interview-details">

                        <div className="detail-card">

                            <span>
                                Category
                            </span>

                            <strong>
                                {category}
                            </strong>

                        </div>


                        <div className="detail-card">

                            <span>
                                Difficulty
                            </span>

                            <strong>
                                {formatDifficulty(
                                    difficulty
                                )}
                            </strong>

                        </div>


                        <div className="detail-card">

                            <span>
                                Type
                            </span>

                            <strong>
                                {interviewType}
                            </strong>

                        </div>


                        <div className="detail-card">

                            <span>
                                Questions
                            </span>

                            <strong>
                                {questionCount}
                            </strong>

                        </div>

                    </div>


                    {/* =====================================
                        ANSWER SECTION
                        ===================================== */}

                    {!evaluation && (

                        <div className="ai-answer-section">

                            <label>
                                Your Answer
                            </label>


                            <textarea
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(
                                        e.target.value
                                    )
                                }
                                placeholder="Type your interview answer here..."
                                rows={8}
                                disabled={
                                    evaluating
                                }
                            />


                            {error && (

                                <div className="ai-error">

                                    ⚠️ {error}

                                </div>

                            )}


                            <button
                                type="button"
                                className="ai-start-btn"
                                onClick={
                                    submitAnswer
                                }
                                disabled={
                                    evaluating ||
                                    !answer.trim()
                                }
                            >

                                {evaluating
                                    ? "Evaluating Answer..."
                                    : "Submit Answer"}

                            </button>

                        </div>

                    )}


                    {/* =====================================
                        EVALUATION
                        ===================================== */}

                    {evaluation && (

                        <div className="ai-evaluation-section">

                            <div className="ai-evaluation-header">

                                <h2>
                                    AI Evaluation
                                </h2>

                                <div className="ai-score">

                                    {evaluation.score ?? "—"}

                                    <span>
                                        /10
                                    </span>

                                </div>

                            </div>


                            {/* FEEDBACK */}

                            <div className="evaluation-card">

                                <h3>
                                    Feedback
                                </h3>

                                <p>
                                    {evaluation.feedback ||
                                        "No feedback available."}
                                </p>

                            </div>


                            {/* STRENGTHS */}

                            <div className="evaluation-card">

                                <h3>
                                    Strengths
                                </h3>

                                <p>
                                    {evaluation.strengths ||
                                        "No strengths provided."}
                                </p>

                            </div>


                            {/* IMPROVEMENTS */}

                            <div className="evaluation-card">

                                <h3>
                                    Areas to Improve
                                </h3>

                                <p>
                                    {evaluation.improvements ||
                                        "No improvement suggestions provided."}
                                </p>

                            </div>


                            {/* IDEAL ANSWER */}

                            <div className="evaluation-card">

                                <h3>
                                    Ideal Answer
                                </h3>

                                <p>
                                    {evaluation.idealAnswer ||
                                        "No ideal answer available."}
                                </p>

                            </div>


                            {/* FOLLOW-UP PREVIEW */}

                            {evaluation.followUpQuestion &&
                                questionNumber <
                                Number(questionCount) && (

                                    <div className="evaluation-card">

                                        <h3>
                                            Next Question
                                        </h3>

                                        <p>
                                            The AI will ask a
                                            follow-up based on
                                            your answer.
                                        </p>

                                    </div>

                                )}


                            {error && (

                                <div className="ai-error">

                                    ⚠️ {error}

                                </div>

                            )}


                            {/* =================================
                                ACTIONS
                                ================================= */}

                            <div className="ai-interview-actions">

                                {questionNumber <
                                    Number(questionCount) ? (

                                    <button
                                        type="button"
                                        className="ai-start-btn"
                                        onClick={
                                            nextQuestion
                                        }
                                        disabled={
                                            loading ||
                                            !evaluation.followUpQuestion
                                        }
                                    >

                                        Next Question →

                                    </button>

                                ) : (

                                    <div className="ai-complete-message">

                                        🎉 Interview completed!

                                    </div>

                                )}


                                <button
                                    type="button"
                                    className="ai-secondary-btn"
                                    onClick={
                                        restartInterview
                                    }
                                >

                                    ← Start New Interview

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        );

    }


    // =====================================================
    // SETUP SCREEN
    // =====================================================

    return (

        <div className="ai-interview-page">

            <div className="ai-interview-setup">

                <div className="ai-interview-setup-header">

                    <div className="ai-icon">
                        🤖
                    </div>

                    <h1>
                        AI Interview
                    </h1>

                    <p>
                        Practice a real interview with
                        your AI interviewer.
                    </p>

                </div>


                {/* =========================================
                    CATEGORY
                    ========================================= */}

                <div className="ai-field">

                    <label>
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    >

                        <option value="Java">
                            Java
                        </option>

                        <option value="Python">
                            Python
                        </option>

                        <option value="JavaScript">
                            JavaScript
                        </option>

                        <option value="SQL">
                            SQL
                        </option>

                        <option value="DSA">
                            DSA
                        </option>

                        <option value="Spring Boot">
                            Spring Boot
                        </option>

                        <option value="React">
                            React
                        </option>

                        <option value="DBMS">
                            DBMS
                        </option>

                        <option value="Operating Systems">
                            Operating Systems
                        </option>

                        <option value="Computer Networks">
                            Computer Networks
                        </option>

                    </select>

                </div>


                {/* =========================================
                    DIFFICULTY
                    ========================================= */}

                <div className="ai-field">

                    <label>
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(
                                e.target.value
                            )
                        }
                    >

                        <option value="EASY">
                            Easy
                        </option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="HARD">
                            Hard
                        </option>

                    </select>

                </div>


                {/* =========================================
                    INTERVIEW TYPE
                    ========================================= */}

                <div className="ai-field">

                    <label>
                        Interview Type
                    </label>

                    <select
                        value={interviewType}
                        onChange={(e) =>
                            setInterviewType(
                                e.target.value
                            )
                        }
                    >

                        <option value="Technical">
                            Technical
                        </option>

                        <option value="HR">
                            HR
                        </option>

                        <option value="Mixed">
                            Mixed
                        </option>

                        <option value="Behavioral">
                            Behavioral
                        </option>

                    </select>

                </div>


                {/* =========================================
                    QUESTION COUNT
                    ========================================= */}

                <div className="ai-field">

                    <label>
                        Number of Questions
                    </label>

                    <select
                        value={questionCount}
                        onChange={(e) =>
                            setQuestionCount(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    >

                        <option value={5}>
                            5
                        </option>

                        <option value={10}>
                            10
                        </option>

                        <option value={15}>
                            15
                        </option>

                        <option value={20}>
                            20
                        </option>

                    </select>

                </div>


                {/* =========================================
                    ERROR
                    ========================================= */}

                {error && (

                    <div className="ai-error">

                        ⚠️ {error}

                    </div>

                )}


                {/* =========================================
                    START BUTTON
                    ========================================= */}

                <button
                    type="button"
                    className="ai-start-btn"
                    onClick={
                        startInterview
                    }
                    disabled={
                        loading
                    }
                >

                    {loading
                        ? "Starting AI Interview..."
                        : "Start AI Interview"}

                </button>


                {/* =========================================
                    INFO
                    ========================================= */}

                <div className="ai-info">

                    <span>
                        🤖
                    </span>

                    <p>
                        The AI interviewer will ask
                        questions based on your selected
                        category and difficulty.
                    </p>

                </div>

            </div>

        </div>

    );
}


// =========================================================
// HELPERS
// =========================================================

function formatDifficulty(
    difficulty
) {

    if (!difficulty) {
        return "";
    }

    return (
        difficulty.charAt(0) +
        difficulty
            .slice(1)
            .toLowerCase()
    );

}


// =========================================================
// EXTRACT AI MESSAGE
// =========================================================

function getInterviewMessage(
    interview
) {

    if (!interview) {

        return (
            "Your interview has started."
        );

    }


    if (
        typeof interview === "string"
    ) {

        return interview;

    }


    if (
        interview.message
    ) {

        return interview.message;

    }


    if (
        interview.question
    ) {

        return interview.question;

    }


    if (
        interview.firstQuestion
    ) {

        return interview.firstQuestion;

    }


    if (
        interview.questionText
    ) {

        return interview.questionText;

    }


    if (
        interview.content
    ) {

        return interview.content;

    }


    return (
        "Your AI interview has started successfully."
    );

}


// =========================================================
// PARSE EVALUATION
// =========================================================

function parseEvaluation(
    data
) {

    /*
     * Proper backend response:
     *
     * {
     *   score: 8,
     *   feedback: "...",
     *   strengths: "...",
     *   improvements: "...",
     *   idealAnswer: "...",
     *   followUpQuestion: "..."
     * }
     */

    if (
        data &&
        typeof data === "object" &&
        data.score !== undefined
    ) {

        return {

            score:
                data.score,

            feedback:
                data.feedback || "",

            strengths:
                data.strengths || "",

            improvements:
                data.improvements || "",

            idealAnswer:
                data.idealAnswer || "",

            followUpQuestion:
                data.followUpQuestion || ""

        };

    }


    /*
     * Temporary/older backend response:
     *
     * {
     *   feedback: "{ ...JSON... }"
     * }
     */

    if (
        data &&
        typeof data.feedback === "string"
    ) {

        try {

            const parsed =
                JSON.parse(
                    data.feedback
                );

            if (
                parsed &&
                typeof parsed === "object"
            ) {

                return {

                    score:
                        parsed.score ?? null,

                    feedback:
                        parsed.feedback || "",

                    strengths:
                        parsed.strengths || "",

                    improvements:
                        parsed.improvements || "",

                    idealAnswer:
                        parsed.idealAnswer || "",

                    followUpQuestion:
                        parsed.followUpQuestion || ""

                };

            }

        } catch {

            return {

                score:
                    null,

                feedback:
                    data.feedback,

                strengths:
                    "",

                improvements:
                    "",

                idealAnswer:
                    "",

                followUpQuestion:
                    ""

            };

        }

    }


    return {

        score:
            null,

        feedback:
            "The AI returned an unexpected evaluation format.",

        strengths:
            "",

        improvements:
            "",

        idealAnswer:
            "",

        followUpQuestion:
            ""

    };

}


export default AIInterview;