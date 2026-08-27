import { useEffect, useMemo, useState } from "react";
import "./Practice.css";

function Practice() {
  // =====================================================
  // SETUP
  // =====================================================

  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedDifficulties, setSelectedDifficulties] =
    useState(["EASY"]);

  const [questionCount, setQuestionCount] =
    useState(10);

  const [availableCount, setAvailableCount] =
    useState(0);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [availabilityLoading, setAvailabilityLoading] =
    useState(false);


  // =====================================================
  // QUIZ
  // =====================================================

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  /*
   * answers object:
   *
   * {
   *   12: "A",
   *   15: "C"
   * }
   */

  const [answers, setAnswers] = useState({});


  /*
   * skipped object:
   *
   * {
   *   12: true
   * }
   */

  const [skipped, setSkipped] = useState({});


  // =====================================================
  // PAGE STATE
  // =====================================================

  const [started, setStarted] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [finalResult, setFinalResult] =
    useState(null);


  // =====================================================
  // DIFFICULTIES
  // =====================================================

  const difficulties = [
    {
      value: "EASY",
      label: "Easy",
    },
    {
      value: "MEDIUM",
      label: "Medium",
    },
    {
      value: "HARD",
      label: "Hard",
    },
  ];


  // =====================================================
  // QUESTION COUNTS
  // =====================================================

  const questionCountOptions = [
    5,
    10,
    15,
    20,
    25,
    30,
  ];


  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    loadCategories();
  }, []);


  const loadCategories = async () => {
    setCategoriesLoading(true);

    setError("");

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/questions/categories",
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            Accept:
              "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load categories."
        );
      }

      const data =
        await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid category data."
        );
      }

      setCategories(data);

    } catch (error) {
      console.error(
        "Category loading error:",
        error
      );

      setError(
        error.message ||
          "Failed to load categories."
      );

    } finally {
      setCategoriesLoading(false);
    }
  };


  // =====================================================
  // CATEGORY CHECKBOX
  // =====================================================

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (previous) => {

        if (previous.includes(category)) {

          return previous.filter(
            (item) => item !== category
          );

        }

        return [
          ...previous,
          category,
        ];
      }
    );
  };


  // =====================================================
  // DIFFICULTY CHECKBOX
  // =====================================================

  const handleDifficultyChange = (
    difficulty
  ) => {

    setSelectedDifficulties(
      (previous) => {

        if (
          previous.includes(difficulty)
        ) {

          return previous.filter(
            (item) =>
              item !== difficulty
          );

        }

        return [
          ...previous,
          difficulty,
        ];
      }
    );
  };


  // =====================================================
  // SELECT ALL CATEGORIES
  // =====================================================

  const handleSelectAllCategories = () => {

    if (
      selectedCategories.length ===
      categories.length
    ) {

      setSelectedCategories([]);

      return;
    }

    setSelectedCategories(
      [...categories]
    );
  };


  // =====================================================
  // AVAILABLE QUESTION COUNT
  // =====================================================

  useEffect(() => {

    if (
      selectedCategories.length === 0 ||
      selectedDifficulties.length === 0
    ) {

      setAvailableCount(0);

      return;
    }

    loadAvailableCount();

  }, [
    selectedCategories,
    selectedDifficulties,
  ]);


  const loadAvailableCount = async () => {

    setAvailabilityLoading(true);

    try {

      const token =
        localStorage.getItem("token");


      const params =
        new URLSearchParams();


      selectedCategories.forEach(
        (category) => {
          params.append(
            "categories",
            category
          );
        }
      );


      selectedDifficulties.forEach(
        (difficulty) => {
          params.append(
            "difficulties",
            difficulty
          );
        }
      );


      /*
       * We request a very large count.
       * The backend returns all matching
       * questions up to that count.
       */

      params.append(
        "count",
        "10000"
      );


      const response =
        await fetch(
          `http://localhost:8080/api/questions/practice?${params.toString()}`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      if (!response.ok) {
        throw new Error(
          "Failed to check available questions."
        );
      }


      const data =
        await response.json();


      if (Array.isArray(data)) {

        setAvailableCount(
          data.length
        );

      } else {

        setAvailableCount(0);

      }

    } catch (error) {

      console.error(
        "Availability error:",
        error
      );

      setAvailableCount(0);

    } finally {

      setAvailabilityLoading(false);

    }
  };


  // =====================================================
  // QUESTION COUNT VALIDATION
  // =====================================================

  const effectiveQuestionCount =
    Math.min(
      questionCount,
      availableCount
    );


  // =====================================================
  // START QUIZ
  // =====================================================

  const handleStartPractice = async () => {

    setError("");


    if (
      selectedCategories.length === 0
    ) {

      setError(
        "Please select at least one topic."
      );

      return;
    }


    if (
      selectedDifficulties.length === 0
    ) {

      setError(
        "Please select at least one difficulty."
      );

      return;
    }


    if (availableCount === 0) {

      setError(
        "No questions are available for the selected topics and difficulties."
      );

      return;
    }


    if (questionCount > availableCount) {

      setError(
        `Only ${availableCount} matching question${
          availableCount === 1
            ? ""
            : "s"
        } are available.`
      );

      return;
    }


    setLoading(true);


    try {

      const token =
        localStorage.getItem("token");


      const params =
        new URLSearchParams();


      selectedCategories.forEach(
        (category) => {

          params.append(
            "categories",
            category
          );

        }
      );


      selectedDifficulties.forEach(
        (difficulty) => {

          params.append(
            "difficulties",
            difficulty
          );

        }
      );


      params.append(
        "count",
        String(questionCount)
      );


      const response =
        await fetch(
          `http://localhost:8080/api/questions/practice?${params.toString()}`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
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

        throw new Error(
          typeof data === "string"
            ? data
            : "Failed to load practice questions."
        );

      }


      if (
        !Array.isArray(data) ||
        data.length === 0
      ) {

        throw new Error(
          "No matching questions were found."
        );

      }


      if (
        data.length < questionCount
      ) {

        throw new Error(
          `Only ${data.length} matching questions are available.`
        );

      }


      setQuestions(data);

      setCurrentQuestion(0);

      setAnswers({});

      setSkipped({});

      setFinalResult(null);

      setSubmitted(false);

      setStarted(true);


    } catch (error) {

      console.error(
        "Start practice error:",
        error
      );

      setError(
        error.message ||
          "Failed to start practice."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // CURRENT QUESTION
  // =====================================================

  const question =
    questions[currentQuestion];


  // =====================================================
  // SELECT ANSWER
  // =====================================================

  const handleAnswerSelect = (
    answer
  ) => {

    if (!question) {
      return;
    }


    setAnswers(
      (previous) => ({

        ...previous,

        [question.id]:
          answer,

      })
    );


    /*
     * If the user answers a previously
     * skipped question, remove it
     * from skipped state.
     */

    setSkipped(
      (previous) => {

        const updated = {
          ...previous,
        };

        delete updated[question.id];

        return updated;
      }
    );
  };


  // =====================================================
  // SKIP QUESTION
  // =====================================================

  const handleSkip = () => {

    if (!question) {
      return;
    }


    /*
     * Remove any selected answer.
     */

    setAnswers(
      (previous) => {

        const updated = {
          ...previous,
        };

        delete updated[question.id];

        return updated;
      }
    );


    /*
     * Mark as skipped.
     */

    setSkipped(
      (previous) => ({

        ...previous,

        [question.id]:
          true,

      })
    );


    /*
     * Move to next question.
     */

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      return;
    }


    /*
     * If this is the last question,
     * go back to the first unanswered
     * or skipped question.
     */

    const nextIndex =
      questions.findIndex(
        (item) =>
          !answers[item.id] &&
          item.id !== question.id
      );


    if (nextIndex !== -1) {

      setCurrentQuestion(
        nextIndex
      );

    }
  };


  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const handleNext = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

    }

  };


  // =====================================================
  // PREVIOUS QUESTION
  // =====================================================

  const handlePrevious = () => {

    if (
      currentQuestion > 0
    ) {

      setCurrentQuestion(
        currentQuestion - 1
      );

    }

  };


  // =====================================================
  // GO TO QUESTION
  // =====================================================

  const handleQuestionNavigation = (
    index
  ) => {

    setCurrentQuestion(index);

  };


  // =====================================================
  // CALCULATE RESULT
  // =====================================================

  const calculateResult = () => {

    let correct = 0;

    let incorrect = 0;

    let unanswered = 0;


    questions.forEach(
      (item) => {

        const userAnswer =
          answers[item.id];


        if (!userAnswer) {

          unanswered++;

          return;

        }


        if (
          userAnswer ===
          item.correctAnswer
        ) {

          correct++;

        } else {

          incorrect++;

        }

      }
    );


    const total =
      questions.length;


    const accuracy =
      total > 0
        ? (correct / total) * 100
        : 0;


    return {

      total,

      correct,

      incorrect,

      unanswered,

      accuracy,

    };
  };


  // =====================================================
  // SUBMIT QUIZ
  // =====================================================

  const handleSubmitQuiz = async () => {

    const unanswered =
      questions.filter(
        (item) =>
          !answers[item.id]
      ).length;


    if (unanswered > 0) {

      const confirmed =
        window.confirm(
          `You have ${unanswered} unanswered question${
            unanswered === 1
              ? ""
              : "s"
          }.\n\nDo you want to submit the quiz anyway?`
        );


      if (!confirmed) {

        return;

      }

    }


    setSubmitting(true);

    setError("");


    try {

      /*
       * For the current frontend architecture,
       * correctness is calculated after the
       * quiz is submitted.
       */

      const result =
        calculateResult();


      /*
       * Save result if the history API exists.
       */

      try {

        const token =
          localStorage.getItem("token");


        await fetch(
          "http://localhost:8080/api/practice/history",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },

            body: JSON.stringify({

              categories:
                selectedCategories,

              difficulties:
                selectedDifficulties,

              totalQuestions:
                result.total,

              correctAnswers:
                result.correct,

              wrongAnswers:
                result.incorrect,

              unanswered:
                result.unanswered,

              score:
                result.correct,

              accuracy:
                result.accuracy,

            }),
          }
        );

      } catch (historyError) {

        /*
         * Do not prevent the user from
         * seeing their result if history
         * saving isn't implemented yet.
         */

        console.warn(
          "History save skipped:",
          historyError
        );

      }


      setFinalResult(result);

      setSubmitted(true);


    } catch (error) {

      console.error(
        "Submit quiz error:",
        error
      );

      setError(
        error.message ||
          "Failed to submit quiz."
      );

    } finally {

      setSubmitting(false);

    }
  };


  // =====================================================
  // RESTART
  // =====================================================

  const handleRestart = () => {

    setQuestions([]);

    setCurrentQuestion(0);

    setAnswers({});

    setSkipped({});

    setStarted(false);

    setSubmitted(false);

    setSubmitting(false);

    setFinalResult(null);

    setError("");

  };


  // =====================================================
  // ANSWER STATUS
  // =====================================================

  const getQuestionStatus = (
    item,
    index
  ) => {

    if (
      answers[item.id]
    ) {

      return "answered";

    }


    if (
      skipped[item.id]
    ) {

      return "skipped";

    }


    if (
      index === currentQuestion
    ) {

      return "current";

    }


    return "unanswered";
  };


  // =====================================================
  // SETUP SCREEN
  // =====================================================

  if (!started && !submitted) {

    return (

      <div className="practice-page">

        <div className="practice-setup-card">

          <div className="practice-header">

            <h1>
              Practice
            </h1>

            <p>
              Build your own interview practice
              session.
            </p>

          </div>


          {/* ============================================
              TOPICS
              ============================================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <div>

                <h2>
                  Topics
                </h2>

                <p>
                  Select one or more topics.
                </p>

              </div>


              {categories.length > 0 && (

                <button
                  type="button"
                  className="select-all-btn"
                  onClick={
                    handleSelectAllCategories
                  }
                >

                  {selectedCategories.length ===
                  categories.length
                    ? "Clear All"
                    : "Select All"}

                </button>

              )}

            </div>


            {categoriesLoading ? (

              <div className="setup-loading">
                Loading topics...
              </div>

            ) : categories.length === 0 ? (

              <div className="setup-empty">
                No topics available.
              </div>

            ) : (

              <div className="checkbox-grid">

                {categories.map(
                  (category) => (

                    <label
                      key={category}
                      className={
                        selectedCategories.includes(
                          category
                        )
                          ? "checkbox-card selected"
                          : "checkbox-card"
                      }
                    >

                      <input
                        type="checkbox"
                        checked={
                          selectedCategories.includes(
                            category
                          )
                        }
                        onChange={() =>
                          handleCategoryChange(
                            category
                          )
                        }
                      />


                      <span className="custom-checkbox">

                        {selectedCategories.includes(
                          category
                        )
                          ? "✓"
                          : ""}

                      </span>


                      <span className="checkbox-label">
                        {category}
                      </span>

                    </label>

                  )
                )}

              </div>

            )}

          </div>


          {/* ============================================
              DIFFICULTY
              ============================================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <div>

                <h2>
                  Difficulty
                </h2>

                <p>
                  Select one or more difficulty
                  levels.
                </p>

              </div>

            </div>


            <div className="difficulty-grid">

              {difficulties.map(
                (item) => (

                  <label
                    key={item.value}
                    className={
                      selectedDifficulties.includes(
                        item.value
                      )
                        ? "difficulty-card selected"
                        : "difficulty-card"
                    }
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedDifficulties.includes(
                          item.value
                        )
                      }
                      onChange={() =>
                        handleDifficultyChange(
                          item.value
                        )
                      }
                    />


                    <span className="custom-checkbox">

                      {selectedDifficulties.includes(
                        item.value
                      )
                        ? "✓"
                        : ""}

                    </span>


                    <span>
                      {item.label}
                    </span>

                  </label>

                )
              )}

            </div>

          </div>


          {/* ============================================
              QUESTION COUNT
              ============================================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <div>

                <h2>
                  Number of Questions
                </h2>

                <p>
                  Choose how many questions you
                  want to practice.
                </p>

              </div>

            </div>


            <div className="question-count-grid">

              {questionCountOptions.map(
                (count) => (

                  <button
                    key={count}
                    type="button"
                    className={
                      questionCount === count
                        ? "count-btn selected"
                        : "count-btn"
                    }
                    onClick={() =>
                      setQuestionCount(
                        count
                      )
                    }
                  >

                    {count}

                  </button>

                )
              )}

            </div>


            <div className="availability-box">

              <span>
                Available matching questions
              </span>


              <strong>

                {availabilityLoading
                  ? "Checking..."
                  : availableCount}

              </strong>

            </div>

          </div>


          {/* ============================================
              ERROR
              ============================================ */}

          {error && (

            <div className="practice-error">

              ⚠️ {error}

            </div>

          )}


          {/* ============================================
              START
              ============================================ */}

          <button
            type="button"
            className="start-practice-btn"
            onClick={
              handleStartPractice
            }
            disabled={
              loading ||
              categoriesLoading ||
              selectedCategories.length === 0 ||
              selectedDifficulties.length === 0 ||
              availableCount === 0 ||
              questionCount > availableCount
            }
          >

            {loading
              ? "Preparing Quiz..."
              : "🚀 Start Practice"}

          </button>

        </div>

      </div>

    );
  }


  // =====================================================
  // RESULT SCREEN
  // =====================================================

  if (submitted && finalResult) {

    return (

      <div className="practice-page">

        <div className="result-container">

          <div className="result-header">

            <div className="result-icon">
              🎉
            </div>

            <h1>
              Quiz Completed!
            </h1>

            <p>
              Here's how you performed.
            </p>

          </div>


          {/* ==========================================
              SCORE
              ========================================== */}

          <div className="score-circle">

            <strong>
              {finalResult.correct}
              /
              {finalResult.total}
            </strong>

            <span>
              Score
            </span>

          </div>


          {/* ==========================================
              STATISTICS
              ========================================== */}

          <div className="result-stats">

            <div className="result-stat correct-stat">

              <strong>
                {finalResult.correct}
              </strong>

              <span>
                Correct
              </span>

            </div>


            <div className="result-stat incorrect-stat">

              <strong>
                {finalResult.incorrect}
              </strong>

              <span>
                Incorrect
              </span>

            </div>


            <div className="result-stat unanswered-stat">

              <strong>
                {finalResult.unanswered}
              </strong>

              <span>
                Unanswered
              </span>

            </div>


            <div className="result-stat accuracy-stat">

              <strong>
                {Math.round(
                  finalResult.accuracy
                )}
                %
              </strong>

              <span>
                Accuracy
              </span>

            </div>

          </div>


          {/* ==========================================
              QUIZ DETAILS
              ========================================== */}

          <div className="result-details">

            <div>

              <strong>
                Topics
              </strong>

              <span>
                {selectedCategories.join(
                  ", "
                )}
              </span>

            </div>


            <div>

              <strong>
                Difficulty
              </strong>

              <span>
                {selectedDifficulties
                  .map(
                    (difficulty) =>
                      difficulty.charAt(0) +
                      difficulty
                        .slice(1)
                        .toLowerCase()
                  )
                  .join(", ")}
              </span>

            </div>

          </div>


          {/* ==========================================
              REVIEW
              ========================================== */}

          <div className="review-section">

            <h2>
              Review Answers
            </h2>


            <div className="review-list">

              {questions.map(
                (item, index) => {

                  const userAnswer =
                    answers[item.id];

                  const isCorrect =
                    userAnswer ===
                    item.correctAnswer;

                  const isSkipped =
                    !userAnswer;


                  return (

                    <div
                      key={item.id}
                      className={
                        isSkipped
                          ? "review-item unanswered"
                          : isCorrect
                          ? "review-item correct"
                          : "review-item incorrect"
                      }
                    >

                      <div className="review-number">

                        {index + 1}

                      </div>


                      <div className="review-content">

                        <h3>

                          {item.questionText}

                        </h3>


                        <div className="review-answer">

                          <span>

                            Your answer:

                          </span>


                          <strong>

                            {userAnswer
                              ? userAnswer
                              : "Unanswered"}

                          </strong>

                        </div>


                        <div className="review-answer">

                          <span>

                            Correct answer:

                          </span>


                          <strong>

                            {item.correctAnswer}

                          </strong>

                        </div>

                      </div>


                      <div className="review-status">

                        {isSkipped
                          ? "—"
                          : isCorrect
                          ? "✓"
                          : "✗"}

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>


          {/* ==========================================
              ACTIONS
              ========================================== */}

          <button
            type="button"
            className="start-practice-btn"
            onClick={
              handleRestart
            }
          >

            🔄 Start New Practice

          </button>

        </div>

      </div>

    );
  }


  // =====================================================
  // QUIZ SCREEN
  // =====================================================

  if (!question) {

    return (

      <div className="practice-page">

        <div className="practice-setup-card">

          <div className="practice-error">
            Question could not be loaded.
          </div>


          <button
            type="button"
            className="start-practice-btn"
            onClick={
              handleRestart
            }
          >
            ← Back to Practice
          </button>

        </div>

      </div>

    );
  }


  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;


  const selectedAnswer =
    answers[question.id] || "";


  const isSkipped =
    skipped[question.id] === true;


  const answeredCount =
    Object.keys(answers).length;


  const unansweredCount =
    questions.length -
    answeredCount;


  return (

    <div className="practice-page">

      <div className="quiz-container">

        {/* ==========================================
            QUIZ HEADER
            ========================================== */}

        <div className="quiz-header">

          <div>

            <span className="quiz-category-label">
              {selectedCategories.length === 1
                ? selectedCategories[0]
                : `${selectedCategories.length} Topics`}
            </span>

            <h1>
              Practice Quiz
            </h1>

          </div>


          <div className="quiz-progress-text">

            {currentQuestion + 1}

            <span>
              /
              {questions.length}
            </span>

          </div>

        </div>


        {/* ==========================================
            PROGRESS BAR
            ========================================== */}

        <div className="quiz-progress-track">

          <div
            className="quiz-progress-bar"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>


        {/* ==========================================
            QUESTION NAVIGATOR
            ========================================== */}

        <div className="question-navigator">

          <div className="navigator-header">

            <span>
              Questions
            </span>

            <span>
              {answeredCount} answered ·{" "}
              {unansweredCount} unanswered
            </span>

          </div>


          <div className="navigator-grid">

            {questions.map(
              (item, index) => {

                const status =
                  getQuestionStatus(
                    item,
                    index
                  );


                return (

                  <button
                    key={item.id}
                    type="button"
                    className={`navigator-number ${status}`}
                    onClick={() =>
                      handleQuestionNavigation(
                        index
                      )
                    }
                  >

                    {index + 1}

                  </button>

                );

              }
            )}

          </div>

        </div>


        {/* ==========================================
            QUESTION CARD
            ========================================== */}

        <div className="quiz-question-card">

          <div className="quiz-question-meta">

            <span>
              {question.category}
            </span>


            <span>
              {question.difficulty}
            </span>


            {isSkipped && (

              <span className="skipped-label">
                Skipped
              </span>

            )}

          </div>


          <h2 className="quiz-question-text">

            {question.questionText}

          </h2>


          {/* ========================================
              OPTIONS
              ======================================== */}

          {question.type === "MCQ" && (

            <div className="quiz-options">

              {[
                {
                  key: "A",
                  value:
                    question.optionA,
                },

                {
                  key: "B",
                  value:
                    question.optionB,
                },

                {
                  key: "C",
                  value:
                    question.optionC,
                },

                {
                  key: "D",
                  value:
                    question.optionD,
                },

              ].map(
                (option) => (

                  <button
                    key={option.key}
                    type="button"
                    className={
                      selectedAnswer ===
                      option.key
                        ? "quiz-option selected"
                        : "quiz-option"
                    }
                    onClick={() =>
                      handleAnswerSelect(
                        option.key
                      )
                    }
                  >

                    <span className="quiz-option-letter">

                      {option.key}

                    </span>


                    <span className="quiz-option-text">

                      {option.value}

                    </span>

                  </button>

                )
              )}

            </div>

          )}


          {/* ========================================
              QUIZ ACTIONS
              ======================================== */}

          <div className="quiz-actions">

            <button
              type="button"
              className="quiz-secondary-btn"
              onClick={
                handlePrevious
              }
              disabled={
                currentQuestion === 0
              }
            >
              ← Previous
            </button>


            <button
              type="button"
              className="quiz-skip-btn"
              onClick={
                handleSkip
              }
            >
              Skip
            </button>


            {currentQuestion <
            questions.length - 1 ? (

              <button
                type="button"
                className="quiz-next-btn"
                onClick={
                  handleNext
                }
              >
                Next →
              </button>

            ) : (

              <button
                type="button"
                className="quiz-submit-btn"
                onClick={
                  handleSubmitQuiz
                }
                disabled={
                  submitting
                }
              >

                {submitting
                  ? "Submitting..."
                  : "Submit Quiz ✓"}

              </button>

            )}

          </div>

        </div>


        {/* ==========================================
            FOOTER INFO
            ========================================== */}

        <div className="quiz-footer">

          <span>
            ✓ Answered:{" "}
            {answeredCount}
          </span>

          <span>
            — Unanswered:{" "}
            {unansweredCount}
          </span>

          <span>
            Correct answers are revealed
            after submission.
          </span>

        </div>

      </div>

    </div>

  );
}

export default Practice;