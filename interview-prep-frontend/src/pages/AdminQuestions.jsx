import { useState } from "react";

function AdminQuestions() {

    const [activeSection, setActiveSection] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const emptyForm = {
        questionText: "",
        category: "",
        difficulty: "EASY",
        type: "MCQ",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        explanation: ""
    };

    const [formData, setFormData] = useState(emptyForm);

    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [questionsLoading, setQuestionsLoading] = useState(false);


    // =========================
    // HANDLE FORM CHANGES
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================
    // FETCH ADMIN QUESTIONS
    // =========================

    const fetchQuestions = async () => {

        setQuestionsLoading(true);
        setMessage("");

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/admin/questions",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load questions");
            }

            const data = await response.json();

            setQuestions(data);

        } catch (error) {

            setMessage(error.message);

        } finally {

            setQuestionsLoading(false);
        }
    };


    // =========================
    // VIEW QUESTIONS
    // =========================

    const handleViewQuestions = () => {

        setActiveSection("view");
        setEditingQuestion(null);

        fetchQuestions();
    };


    // =========================
    // OPEN ADD FORM
    // =========================

    const handleAddQuestion = () => {

        setActiveSection("add");
        setEditingQuestion(null);
        setFormData(emptyForm);
        setMessage("");
    };


    // =========================
    // OPEN EDIT FORM
    // =========================

    const handleEdit = (question) => {

        setEditingQuestion(question);

        setFormData({
            questionText: question.questionText || "",
            category: question.category || "",
            difficulty: question.difficulty || "EASY",
            type: question.type || "MCQ",
            optionA: question.optionA || "",
            optionB: question.optionB || "",
            optionC: question.optionC || "",
            optionD: question.optionD || "",
            correctAnswer: question.correctAnswer || "",
            explanation: question.explanation || ""
        });

        setActiveSection("edit");
        setMessage("");
    };


    // =========================
    // ADD / EDIT QUESTION
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const token = localStorage.getItem("token");

            let url;
            let method;

            if (editingQuestion) {

                // EDIT
                url =
                    `http://localhost:8080/api/admin/questions/${editingQuestion.id}`;

                method = "PUT";

            } else {

                // ADD
                url =
                    "http://localhost:8080/api/admin/questions";

                method = "POST";
            }

            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    (
                        editingQuestion
                            ? "Failed to update question"
                            : "Failed to add question"
                    )
                );
            }


            // =========================
            // SUCCESS MESSAGE
            // =========================

            if (editingQuestion) {

                setMessage(
                    "Question updated successfully!"
                );

            } else {

                setMessage(
                    "Question added successfully!"
                );
            }


            // Clear form

            setFormData(emptyForm);

            setEditingQuestion(null);

            // Go back to question list

            setActiveSection("view");

            // Refresh list

            fetchQuestions();

        } catch (error) {

            setMessage(error.message);

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // DELETE QUESTION
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/admin/questions/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to delete question"
                );
            }

            setQuestions(
                questions.filter(
                    (question) => question.id !== id
                )
            );

            setMessage(
                "Question deleted successfully!"
            );

        } catch (error) {

            setMessage(error.message);
        }
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const handleCancelEdit = () => {

        setEditingQuestion(null);
        setFormData(emptyForm);
        setActiveSection("view");

        fetchQuestions();
    };


    return (

        <div
            style={{
                padding: "40px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >

            {/* =========================
                PAGE TITLE
            ========================= */}

            <h1>
                Question Management
            </h1>

            <p>
                Manage the PrepAI interview question bank.
            </p>


            {/* =========================
                MAIN BUTTONS
            ========================= */}

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "30px",
                    marginBottom: "30px"
                }}
            >

                <button
                    onClick={handleViewQuestions}
                >
                    📋 View Questions
                </button>

                <button
                    onClick={handleAddQuestion}
                >
                    ➕ Add Question
                </button>

            </div>


            {/* =========================
                VIEW QUESTIONS
            ========================= */}

            {activeSection === "view" && (

                <div>

                    <h2>
                        Question Bank
                    </h2>


                    {questionsLoading ? (

                        <p>
                            Loading questions...
                        </p>

                    ) : questions.length === 0 ? (

                        <p>
                            No questions found.
                        </p>

                    ) : (

                        questions.map((question) => (

                            <div
                                key={question.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "20px",
                                    marginBottom: "15px"
                                }}
                            >

                                <h3>
                                    {question.id}.{" "}
                                    {question.questionText}
                                </h3>


                                <p>
                                    <strong>
                                        Category:
                                    </strong>{" "}
                                    {question.category}
                                </p>


                                <p>
                                    <strong>
                                        Difficulty:
                                    </strong>{" "}
                                    {question.difficulty}
                                </p>


                                <p>
                                    <strong>
                                        Type:
                                    </strong>{" "}
                                    {question.type}
                                </p>


                                <p>
                                    <strong>
                                        A:
                                    </strong>{" "}
                                    {question.optionA}
                                </p>


                                <p>
                                    <strong>
                                        B:
                                    </strong>{" "}
                                    {question.optionB}
                                </p>


                                <p>
                                    <strong>
                                        C:
                                    </strong>{" "}
                                    {question.optionC}
                                </p>


                                <p>
                                    <strong>
                                        D:
                                    </strong>{" "}
                                    {question.optionD}
                                </p>


                                {/* ADMIN ANSWER */}

                                <p>
                                    <strong>
                                        Correct Answer:
                                    </strong>{" "}
                                    {question.correctAnswer}
                                </p>


                                <p>
                                    <strong>
                                        Explanation:
                                    </strong>{" "}
                                    {question.explanation}
                                </p>


                                {/* ACTION BUTTONS */}

                                <div
                                    style={{
                                        marginTop: "15px",
                                        display: "flex",
                                        gap: "10px"
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            handleEdit(question)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                question.id
                                            )
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            {(activeSection === "add" ||
                activeSection === "edit") && (

                <div>

                    <h2>

                        {editingQuestion
                            ? "Edit Question"
                            : "Add New Question"}

                    </h2>


                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* QUESTION */}

                        <div>

                            <label>
                                Question
                            </label>

                            <br />

                            <textarea
                                name="questionText"
                                value={
                                    formData.questionText
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter the question"
                                required
                                rows="4"
                                style={{
                                    width: "100%"
                                }}
                            />

                        </div>


                        <br />


                        {/* CATEGORY */}

                        <div>

                            <label>
                                Category
                            </label>

                            <br />

                            <input
                                type="text"
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: Java"
                                required
                            />

                        </div>


                        <br />


                        {/* DIFFICULTY */}

                        <div>

                            <label>
                                Difficulty
                            </label>

                            <br />

                            <select
                                name="difficulty"
                                value={
                                    formData.difficulty
                                }
                                onChange={
                                    handleChange
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


                        <br />


                        {/* TYPE */}

                        <div>

                            <label>
                                Type
                            </label>

                            <br />

                            <select
                                name="type"
                                value={
                                    formData.type
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="MCQ">
                                    MCQ
                                </option>

                                <option value="CODING">
                                    Coding
                                </option>

                                <option value="DESCRIPTIVE">
                                    Descriptive
                                </option>

                            </select>

                        </div>


                        <br />


                        {/* OPTIONS */}

                        <h3>
                            Options
                        </h3>


                        <input
                            type="text"
                            name="optionA"
                            value={
                                formData.optionA
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Option A"
                            required
                        />

                        <br />
                        <br />


                        <input
                            type="text"
                            name="optionB"
                            value={
                                formData.optionB
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Option B"
                            required
                        />

                        <br />
                        <br />


                        <input
                            type="text"
                            name="optionC"
                            value={
                                formData.optionC
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Option C"
                            required
                        />

                        <br />
                        <br />


                        <input
                            type="text"
                            name="optionD"
                            value={
                                formData.optionD
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Option D"
                            required
                        />

                        <br />
                        <br />


                        {/* CORRECT ANSWER */}

                        <label>
                            Correct Answer
                        </label>

                        <br />

                        <select
                            name="correctAnswer"
                            value={
                                formData.correctAnswer
                            }
                            onChange={
                                handleChange
                            }
                            required
                        >

                            <option value="">
                                Select correct answer
                            </option>

                            <option value="A">
                                A
                            </option>

                            <option value="B">
                                B
                            </option>

                            <option value="C">
                                C
                            </option>

                            <option value="D">
                                D
                            </option>

                        </select>


                        <br />
                        <br />


                        {/* EXPLANATION */}

                        <label>
                            Explanation
                        </label>

                        <br />

                        <textarea
                            name="explanation"
                            value={
                                formData.explanation
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Explain the correct answer"
                            rows="4"
                            style={{
                                width: "100%"
                            }}
                            required
                        />


                        <br />
                        <br />


                        {/* FORM BUTTONS */}

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {loading

                                ? (
                                    editingQuestion
                                        ? "Saving..."
                                        : "Adding..."
                                )

                                : (
                                    editingQuestion
                                        ? "💾 Save Changes"
                                        : "➕ Add Question"
                                )
                            }

                        </button>


                        {editingQuestion && (

                            <button
                                type="button"
                                onClick={
                                    handleCancelEdit
                                }
                                style={{
                                    marginLeft: "10px"
                                }}
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </div>

            )}


            {/* =========================
                MESSAGE
            ========================= */}

            {message && (

                <p
                    style={{
                        marginTop: "20px"
                    }}
                >
                    {message}
                </p>

            )}

        </div>
    );
}

export default AdminQuestions;