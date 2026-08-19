import { useState } from "react";
import "./Practice.css";

function Practice() {

    const [category, setCategory] = useState("Java");
    const [difficulty, setDifficulty] = useState("EASY");

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerResult, setAnswerResult] = useState(null);

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    const [loading, setLoading] = useState(false);
    const [answerLoading, setAnswerLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);

    const [error, setError] = useState("");

    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [finalResult, setFinalResult] = useState(null);


    // =========================================
    // START PRACTICE
    // =========================================

    const handleStartPractice = async () => {

        setLoading(true);
        setError("");

        setQuestions([]);
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setAnswerResult(null);

        setCorrectAnswers(0);
        setWrongAnswers(0);

        setCompleted(false);
        setFinalResult(null);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/questions/practice?category=${category}&difficulty=${difficulty}`,
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load practice questions"
                );
            }

            const data = await response.json();

            if (data.length === 0) {

                setError(
                    "No questions found for this category and difficulty."
                );

                setStarted(false);

                return;
            }

            setQuestions(data);
            setCurrentQuestion(0);
            setSelectedAnswer("");
            setAnswerResult(null);

            setCorrectAnswers(0);
            setWrongAnswers(0);

            setStarted(true);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // SELECT ANSWER
    // =========================================

    const handleAnswerSelect = (answer) => {

        if (answerResult) {
            return;
        }

        setSelectedAnswer(answer);
    };


    // =========================================
    // SUBMIT ANSWER
    // =========================================

    const handleSubmitAnswer = async () => {

        if (!selectedAnswer) {

            alert("Please select an answer.");

            return;
        }

        setAnswerLoading(true);
        setError("");

        try {

            const token = localStorage.getItem("token");

            const question =
                questions[currentQuestion];

            const response = await fetch(
                "http://localhost:8080/api/practice/answer",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        questionId: question.id,
                        selectedAnswer: selectedAnswer
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to check answer"
                );
            }

            setAnswerResult(data);

            if (data.correct) {

                setCorrectAnswers(
                    previous => previous + 1
                );

            } else {

                setWrongAnswers(
                    previous => previous + 1
                );
            }

        } catch (error) {

            setError(error.message);

        } finally {

            setAnswerLoading(false);
        }
    };


    // =========================================
    // FINISH PRACTICE
    // =========================================

    const finishPractice = async (
        finalCorrect,
        finalWrong
    ) => {

        setHistoryLoading(true);
        setError("");

        const totalQuestions =
            questions.length;

        const score =
            finalCorrect;

        const accuracy =
            totalQuestions > 0
                ? (finalCorrect / totalQuestions) * 100
                : 0;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/practice/history",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        category: category,
                        difficulty: difficulty,
                        totalQuestions: totalQuestions,
                        correctAnswers: finalCorrect,
                        wrongAnswers: finalWrong,
                        score: score,
                        accuracy: accuracy
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to save practice history"
                );
            }

            setFinalResult({
                totalQuestions: totalQuestions,
                correctAnswers: finalCorrect,
                wrongAnswers: finalWrong,
                score: score,
                accuracy: accuracy
            });

            setCompleted(true);

        } catch (error) {

            setError(error.message);

        } finally {

            setHistoryLoading(false);
        }
    };


    // =========================================
    // NEXT QUESTION
    // =========================================

    const handleNext = () => {

        const isLastQuestion =
            currentQuestion ===
            questions.length - 1;

        if (isLastQuestion) {

            const finalCorrect =
                correctAnswers;

            const finalWrong =
                wrongAnswers;

            finishPractice(
                finalCorrect,
                finalWrong
            );

            return;
        }

        setCurrentQuestion(
            currentQuestion + 1
        );

        setSelectedAnswer("");
        setAnswerResult(null);
    };


    // =========================================
    // PRACTICE AGAIN
    // =========================================

    const handlePracticeAgain = () => {

        setCompleted(false);
        setStarted(false);

        setQuestions([]);
        setCurrentQuestion(0);

        setSelectedAnswer("");
        setAnswerResult(null);

        setCorrectAnswers(0);
        setWrongAnswers(0);

        setFinalResult(null);
        setError("");
    };


    // =========================================
    // SETUP SCREEN
    // =========================================

    if (!started && !completed) {

        return (

            <div className="practice-page">

                <div className="practice-setup">

                    <h1>
                        Practice
                    </h1>

                    <p>
                        Choose your topic and difficulty
                        to start practicing.
                    </p>


                    {/* CATEGORY */}

                    <div className="practice-field">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="Java">
                                Java
                            </option>

                            <option value="Python">
                                Python
                            </option>

                            <option value="SQL">
                                SQL
                            </option>

                            <option value="DSA">
                                DSA
                            </option>

                        </select>

                    </div>


                    {/* DIFFICULTY */}

                    <div className="practice-field">

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
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


                    {/* ERROR */}

                    {error && (

                        <div className="practice-error">
                            {error}
                        </div>

                    )}


                    {/* START */}

                    <button
                        className="start-practice-btn"
                        onClick={handleStartPractice}
                        disabled={loading}
                    >

                        {loading
                            ? "Loading..."
                            : "🚀 Start Practice"}

                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // COMPLETED SCREEN
    // =========================================

    if (completed && finalResult) {

        return (

            <div className="practice-page">

                <div className="practice-setup">

                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "50px",
                                marginBottom: "10px"
                            }}
                        >
                            🎉
                        </div>

                        <h1>
                            Practice Complete!
                        </h1>

                        <p>
                            Great job! Here's your result.
                        </p>

                    </div>


                    {/* SCORE */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            marginTop: "30px",
                            flexWrap: "wrap"
                        }}
                    >

                        <div
                            style={{
                                padding: "20px 30px",
                                borderRadius: "12px",
                                background: "#ecfdf3",
                                textAlign: "center"
                            }}
                        >

                            <strong
                                style={{
                                    display: "block",
                                    fontSize: "30px",
                                    color: "#198754"
                                }}
                            >
                                {finalResult.correctAnswers}
                                /
                                {finalResult.totalQuestions}
                            </strong>

                            <span>
                                Score
                            </span>

                        </div>


                        <div
                            style={{
                                padding: "20px 30px",
                                borderRadius: "12px",
                                background: "#f1f5f9",
                                textAlign: "center"
                            }}
                        >

                            <strong
                                style={{
                                    display: "block",
                                    fontSize: "30px",
                                    color: "#172033"
                                }}
                            >
                                {Math.round(
                                    finalResult.accuracy
                                )}%
                            </strong>

                            <span>
                                Accuracy
                            </span>

                        </div>

                    </div>


                    {/* DETAILS */}

                    <div
                        style={{
                            marginTop: "30px",
                            borderTop: "1px solid #e5e7eb",
                            paddingTop: "20px"
                        }}
                    >

                        <p>
                            <strong>
                                Category:
                            </strong>{" "}
                            {category}
                        </p>

                        <p>
                            <strong>
                                Difficulty:
                            </strong>{" "}
                            {difficulty}
                        </p>

                        <p>
                            <strong>
                                Correct:
                            </strong>{" "}
                            {finalResult.correctAnswers}
                        </p>

                        <p>
                            <strong>
                                Incorrect:
                            </strong>{" "}
                            {finalResult.wrongAnswers}
                        </p>

                    </div>


                    {error && (

                        <div className="practice-error">
                            {error}
                        </div>

                    )}


                    <button
                        className="start-practice-btn"
                        onClick={handlePracticeAgain}
                    >
                        🔄 Practice Again
                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // CURRENT QUESTION
    // =========================================

    const question =
        questions[currentQuestion];

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    // =========================================
    // QUESTION SCREEN
    // =========================================

    return (

        <div className="practice-page">

            <div className="practice-container">

                <div className="question-card">

                    {/* TOP */}

                    <div className="question-top">

                        <span className="category-badge">
                            {question.category}
                        </span>

                        <span className="question-number">
                            Question {currentQuestion + 1} of{" "}
                            {questions.length}
                        </span>

                        <span className="difficulty-badge">
                            {question.difficulty}
                        </span>

                    </div>


                    {/* PROGRESS */}

                    <div className="progress-track">

                        <div
                            className="progress-bar"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>


                    {/* QUESTION */}

                    <h2 className="question-text">
                        {question.questionText}
                    </h2>


                    {/* OPTIONS */}

                    <div className="options-container">

                        <button
                            className={
                                selectedAnswer === "A"
                                    ? "answer-option selected"
                                    : "answer-option"
                            }
                            onClick={() =>
                                handleAnswerSelect("A")
                            }
                        >

                            <span className="option-letter">
                                A
                            </span>

                            <span className="option-text">
                                {question.optionA}
                            </span>

                        </button>


                        <button
                            className={
                                selectedAnswer === "B"
                                    ? "answer-option selected"
                                    : "answer-option"
                            }
                            onClick={() =>
                                handleAnswerSelect("B")
                            }
                        >

                            <span className="option-letter">
                                B
                            </span>

                            <span className="option-text">
                                {question.optionB}
                            </span>

                        </button>


                        <button
                            className={
                                selectedAnswer === "C"
                                    ? "answer-option selected"
                                    : "answer-option"
                            }
                            onClick={() =>
                                handleAnswerSelect("C")
                            }
                        >

                            <span className="option-letter">
                                C
                            </span>

                            <span className="option-text">
                                {question.optionC}
                            </span>

                        </button>


                        <button
                            className={
                                selectedAnswer === "D"
                                    ? "answer-option selected"
                                    : "answer-option"
                            }
                            onClick={() =>
                                handleAnswerSelect("D")
                            }
                        >

                            <span className="option-letter">
                                D
                            </span>

                            <span className="option-text">
                                {question.optionD}
                            </span>

                        </button>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="practice-error">
                            {error}
                        </div>

                    )}


                    {/* SUBMIT */}

                    {!answerResult && (

                        <button
                            className="submit-answer-btn"
                            onClick={handleSubmitAnswer}
                            disabled={answerLoading}
                        >

                            {answerLoading
                                ? "Checking..."
                                : "➤ Submit Answer"}

                        </button>

                    )}

                </div>


                {/* =================================
                    RESULT
                ================================= */}

                {answerResult && (

                    <div
                        className={
                            answerResult.correct
                                ? "result-card correct"
                                : "result-card incorrect"
                        }
                    >

                        <h3 className="result-title">

                            {answerResult.correct
                                ? "✅ Correct! 🎉"
                                : "❌ Incorrect"}

                        </h3>


                        <p>

                            <strong>
                                Correct Answer:
                            </strong>{" "}

                            {answerResult.correctAnswer}

                        </p>


                        <p>

                            <strong>
                                Explanation:
                            </strong>

                            <br />

                            {answerResult.explanation}

                        </p>


                        {/* NEXT / FINISH */}

                        <button
                            className="next-question-btn"
                            onClick={handleNext}
                            disabled={historyLoading}
                        >

                            {historyLoading
                                ? "Saving Result..."
                                : currentQuestion <
                                    questions.length - 1
                                    ? "Next Question →"
                                    : "Finish Practice ✓"}

                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Practice;