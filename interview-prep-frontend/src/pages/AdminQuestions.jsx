import API_URL from "../config";
import React, { useState } from "react";
import "./AdminQuestions.css";

function AdminQuestions() {
  // =====================================================
  // FORM
  // =====================================================

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
    explanation: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  const [editingQuestion, setEditingQuestion] =
    useState(null);


  // =====================================================
  // PAGE SECTION
  // =====================================================

  const [activeSection, setActiveSection] =
    useState(null);


  // =====================================================
  // QUESTIONS
  // =====================================================

  const [questions, setQuestions] =
    useState([]);

  const [questionsLoading, setQuestionsLoading] =
    useState(false);


  // =====================================================
  // GENERAL MESSAGE
  // =====================================================

  const [message, setMessage] =
    useState("");


  // =====================================================
  // FORM LOADING
  // =====================================================

  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // CSV IMPORT
  // =====================================================

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [importLoading, setImportLoading] =
    useState(false);

  const [importResult, setImportResult] =
    useState(null);


  // =====================================================
  // CATEGORY DELETE
  // =====================================================

  const [deleteCategory, setDeleteCategory] =
    useState("");

  const [categoryDeleting, setCategoryDeleting] =
    useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =====================================================
  // FETCH QUESTIONS
  // =====================================================

  const fetchQuestions = async () => {
    setQuestionsLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/questions`,
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
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load questions."
        );
      }

      setQuestions(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(
        "Fetch questions error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to load questions."
      );

    } finally {
      setQuestionsLoading(false);
    }
  };


  // =====================================================
  // VIEW QUESTIONS
  // =====================================================

  const handleViewQuestions = () => {
    setActiveSection("view");

    setEditingQuestion(null);

    setMessage("");

    setImportResult(null);

    fetchQuestions();
  };


  // =====================================================
  // ADD QUESTION
  // =====================================================

  const handleAddQuestion = () => {
    setActiveSection("add");

    setEditingQuestion(null);

    setFormData(emptyForm);

    setMessage("");

    setImportResult(null);
  };


  // =====================================================
  // EDIT QUESTION
  // =====================================================

  const handleEdit = (question) => {
    setEditingQuestion(question);

    setFormData({
      questionText:
        question.questionText || "",

      category:
        question.category || "",

      difficulty:
        question.difficulty || "EASY",

      type:
        question.type || "MCQ",

      optionA:
        question.optionA || "",

      optionB:
        question.optionB || "",

      optionC:
        question.optionC || "",

      optionD:
        question.optionD || "",

      correctAnswer:
        question.correctAnswer || "",

      explanation:
        question.explanation || "",
    });

    setActiveSection("edit");

    setMessage("");

    setImportResult(null);
  };


  // =====================================================
  // ADD / UPDATE QUESTION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const payload = {
        ...formData,
      };

      // Coding / descriptive questions
      // don't use MCQ options.

      if (formData.type !== "MCQ") {
        payload.optionA = "";
        payload.optionB = "";
        payload.optionC = "";
        payload.optionD = "";
        payload.correctAnswer = "";
      }

      const url = editingQuestion
        ? `${API_URL}/api/admin/questions/${editingQuestion.id}`
        : `${API_URL}/api/admin/questions`;

      const method = editingQuestion
        ? "PUT"
        : "POST";

      const response = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

            Accept:
              "application/json",
          },

          body:
            JSON.stringify(payload),
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            (
              editingQuestion
                ? "Failed to update question."
                : "Failed to add question."
            )
        );
      }

      setMessage(
        editingQuestion
          ? "Question updated successfully!"
          : "Question added successfully!"
      );

      setFormData(emptyForm);

      setEditingQuestion(null);

      setActiveSection("view");

      await fetchQuestions();

    } catch (error) {
      console.error(
        "Submit question error:",
        error
      );

      setMessage(
        error.message ||
          "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // DELETE INDIVIDUAL QUESTION
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this question?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/questions/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const text =
        await response.text();

      if (!response.ok) {
        throw new Error(
          text ||
            "Failed to delete question."
        );
      }

      setQuestions(
        (previous) =>
          previous.filter(
            (question) =>
              question.id !== id
          )
      );

      setMessage(
        text ||
          "Question deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete question error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete question."
      );
    }
  };


  // =====================================================
  // DELETE ALL QUESTIONS FROM CATEGORY
  // =====================================================

  const handleDeleteCategory = async () => {

    if (!deleteCategory) {
      setMessage(
        "Please select a category."
      );

      return;
    }


    const confirmed =
      window.confirm(
        `⚠️ WARNING!\n\n` +
        `This will permanently delete ALL questions ` +
        `from "${deleteCategory}".\n\n` +
        `This action cannot be undone.\n\n` +
        `Are you sure?`
      );


    if (!confirmed) {
      return;
    }


    setCategoryDeleting(true);

    setMessage("");


    try {

      const token =
        localStorage.getItem("token");


      if (!token) {
        throw new Error(
          "You are not logged in."
        );
      }


      const response = await fetch(
        `${API_URL}/api/admin/questions/category/${encodeURIComponent(
          deleteCategory
        )}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const text =
        await response.text();


      if (!response.ok) {
        throw new Error(
          text ||
            "Failed to delete category questions."
        );
      }


      setMessage(
        text ||
          "Category questions deleted successfully."
      );


      setDeleteCategory("");


      await fetchQuestions();


    } catch (error) {

      console.error(
        "Delete category error:",
        error
      );


      setMessage(
        error.message ||
          "Failed to delete category questions."
      );


    } finally {

      setCategoryDeleting(false);

    }
  };


  // =====================================================
  // CSV FILE CHANGE
  // =====================================================

  const handleFileChange = (e) => {

    const file =
      e.target.files[0];


    setImportResult(null);


    if (!file) {

      setSelectedFile(null);

      return;
    }


    if (
      !file.name
        .toLowerCase()
        .endsWith(".csv")
    ) {

      setSelectedFile(null);


      setImportResult({
        success: false,

        message:
          "Please select a CSV file.",
      });


      e.target.value = "";

      return;
    }


    setSelectedFile(file);
  };


  // =====================================================
  // IMPORT CSV
  // =====================================================

  const handleImportCSV = async () => {

    if (!selectedFile) {

      setImportResult({
        success: false,

        message:
          "Please select a CSV file first.",
      });

      return;
    }


    setImportLoading(true);

    setImportResult(null);


    try {

      const token =
        localStorage.getItem("token");


      if (!token) {

        throw new Error(
          "You are not logged in."
        );

      }


      const formData =
        new FormData();


      formData.append(
        "file",
        selectedFile
      );


      const response =
        await fetch(
          `${API_URL}/api/admin/questions/import`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
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
            : data?.message ||
                "CSV import failed."
        );

      }


      setImportResult({

        success: true,

        imported:
          data.imported ?? 0,

        failed:
          data.failed ?? 0,

        errors:
          data.errors ?? [],

      });


      setSelectedFile(null);


      const fileInput =
        document.getElementById(
          "question-csv-file"
        );


      if (fileInput) {

        fileInput.value = "";

      }


      await fetchQuestions();


    } catch (error) {

      console.error(
        "CSV import error:",
        error
      );


      setImportResult({

        success: false,

        message:
          error.message ||
          "Failed to import CSV file.",

      });


    } finally {

      setImportLoading(false);

    }
  };


  // =====================================================
  // OPEN IMPORT
  // =====================================================

  const handleOpenImport = () => {

    setActiveSection("import");

    setEditingQuestion(null);

    setSelectedFile(null);

    setImportResult(null);

    setMessage("");

  };


  // =====================================================
  // CANCEL IMPORT
  // =====================================================

  const handleCancelImport = () => {

    setActiveSection("view");

    setSelectedFile(null);

    setImportResult(null);

    setMessage("");

    fetchQuestions();

  };


  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {

    setEditingQuestion(null);

    setFormData(emptyForm);

    setActiveSection("view");

    setMessage("");

    fetchQuestions();

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-questions-container">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-questions-header">

        <h1 className="admin-questions-title">
          Question Management
        </h1>

        <p className="admin-questions-subtitle">
          Manage the PrepAI interview
          question bank.
        </p>

      </div>


      {/* =================================================
          ACTION BUTTONS
          ================================================= */}

      <div className="question-action-bar">

        <button
          type="button"
          className="question-btn question-btn-primary"
          onClick={handleViewQuestions}
        >
          📋 View Questions
        </button>


        <button
          type="button"
          className="question-btn question-btn-primary"
          onClick={handleAddQuestion}
        >
          ➕ Add Question
        </button>


        <button
          type="button"
          className="question-btn question-btn-import"
          onClick={handleOpenImport}
        >
          📥 Bulk Import CSV
        </button>

      </div>


      {/* =================================================
          MESSAGE
          ================================================= */}

      {message && (

        <div className="question-message">

          {message}

        </div>

      )}


      {/* =================================================
          VIEW QUESTIONS
          ================================================= */}

      {activeSection === "view" && (

        <div className="question-card">

          <div className="question-card-header">

            <h2 className="question-card-title">
              Question Bank
            </h2>

            <span className="question-count">
              {questions.length}{" "}
              {questions.length === 1
                ? "Question"
                : "Questions"}
            </span>

          </div>


          {/* =================================================
              DELETE CATEGORY
              ================================================= */}

          {questions.length > 0 && (

            <div className="category-delete-panel">

              <div className="category-delete-content">

                <div>

                  <h3>
                    Delete Questions by Category
                  </h3>

                  <p>
                    Permanently remove all questions
                    belonging to one category.
                  </p>

                </div>


                <div className="category-delete-controls">

                  <select
                    value={deleteCategory}
                    onChange={(e) =>
                      setDeleteCategory(
                        e.target.value
                      )
                    }
                    disabled={
                      categoryDeleting
                    }
                  >

                    <option value="">
                      Select category
                    </option>


                    {[
                      ...new Set(
                        questions
                          .map(
                            (q) =>
                              q.category
                          )
                          .filter(Boolean)
                      ),
                    ]
                      .sort()
                      .map(
                        (category) => (

                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>

                        )
                      )}

                  </select>


                  <button
                    type="button"
                    className="category-delete-button"
                    onClick={
                      handleDeleteCategory
                    }
                    disabled={
                      !deleteCategory ||
                      categoryDeleting
                    }
                  >

                    {categoryDeleting
                      ? "Deleting..."
                      : `🗑️ Delete All ${
                          deleteCategory ||
                          "Category"
                        } Questions`}

                  </button>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              LOADING
              ================================================= */}

          {questionsLoading ? (

            <div className="question-loading">

              <div className="question-spinner"></div>

              <p>
                Loading questions...
              </p>

            </div>


          ) : questions.length === 0 ? (

            <div className="question-empty">

              <div className="question-empty-icon">
                📚
              </div>

              <h3>
                No Questions Found
              </h3>

              <p>
                Your question bank is empty.
                Add your first question or
                import questions using CSV.
              </p>


              <button
                type="button"
                className="question-btn question-btn-primary"
                onClick={handleAddQuestion}
              >
                ➕ Add Question
              </button>

            </div>


          ) : (

            <div>

              {questions.map(
                (question, index) => (

                  <div
                    key={question.id}
                    className="question-item"
                  >

                    <div className="question-content">

                      <div className="question-number">
                        Question {index + 1}
                      </div>


                      <h3 className="question-text">
                        {question.questionText}
                      </h3>


                      {/* META */}

                      <div className="question-meta">

                        <span className="category-badge">
                          📂{" "}
                          {question.category ||
                            "No Category"}
                        </span>


                        <span
                          className={`difficulty-badge ${
                            question.difficulty ===
                            "EASY"
                              ? "difficulty-easy"
                              : question.difficulty ===
                                "MEDIUM"
                              ? "difficulty-medium"
                              : "difficulty-hard"
                          }`}
                        >
                          {question.difficulty ||
                            "EASY"}
                        </span>


                        <span className="type-badge">
                          {question.type ||
                            "MCQ"}
                        </span>

                      </div>


                      {/* OPTIONS */}

                      {question.type === "MCQ" && (

                        <div className="question-options">

                          <div className="question-option">

                            <span className="option-letter">
                              A
                            </span>

                            <span>
                              {question.optionA ||
                                "-"}
                            </span>

                          </div>


                          <div className="question-option">

                            <span className="option-letter">
                              B
                            </span>

                            <span>
                              {question.optionB ||
                                "-"}
                            </span>

                          </div>


                          <div className="question-option">

                            <span className="option-letter">
                              C
                            </span>

                            <span>
                              {question.optionC ||
                                "-"}
                            </span>

                          </div>


                          <div className="question-option">

                            <span className="option-letter">
                              D
                            </span>

                            <span>
                              {question.optionD ||
                                "-"}
                            </span>

                          </div>

                        </div>

                      )}


                      {/* ANSWER */}

                      {question.type === "MCQ" &&
                        question.correctAnswer && (

                          <p className="question-answer">

                            <strong>
                              Correct Answer:
                            </strong>{" "}

                            {question.correctAnswer}

                          </p>

                        )}


                      {/* EXPLANATION */}

                      {question.explanation && (

                        <div className="question-explanation">

                          <strong>
                            Explanation:
                          </strong>

                          <p>
                            {question.explanation}
                          </p>

                        </div>

                      )}

                    </div>


                    {/* ACTIONS */}

                    <div className="question-actions">

                      <button
                        type="button"
                        className="question-btn question-btn-edit"
                        onClick={() =>
                          handleEdit(
                            question
                          )
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        type="button"
                        className="question-btn question-btn-delete"
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

                )
              )}

            </div>

          )}

        </div>

      )}


      {/* =================================================
          CSV IMPORT
          ================================================= */}

      {activeSection === "import" && (

        <div className="question-card csv-import-card">

          <h2 className="question-card-title">
            Bulk Import Questions
          </h2>


          <p className="csv-import-description">
            Upload a CSV file to add multiple
            questions to the PrepAI question
            bank at once.
          </p>


          {/* CSV FORMAT */}

          <div className="csv-format-box">

            <strong>
              CSV columns:
            </strong>

            <p>
              questionText, category,
              difficulty, type, optionA,
              optionB, optionC, optionD,
              correctAnswer, explanation
            </p>

          </div>


          {/* UPLOAD AREA */}

          <div className="csv-upload-area">

            <div className="csv-upload-icon">
              📄
            </div>


            <label
              htmlFor="question-csv-file"
              className="csv-file-label"
            >
              Choose CSV File
            </label>


            <input
              id="question-csv-file"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="csv-file-input"
            />


            {selectedFile ? (

              <div className="csv-selected-file">

                <span>
                  📄
                </span>

                <div>

                  <strong>
                    {selectedFile.name}
                  </strong>

                  <small>
                    {(
                      selectedFile.size /
                      1024
                    ).toFixed(1)}{" "}
                    KB
                  </small>

                </div>

              </div>

            ) : (

              <p className="csv-file-hint">
                Select a .csv file from
                your computer
              </p>

            )}

          </div>


          {/* BUTTONS */}

          <div className="question-form-actions">

            <button
              type="button"
              className="question-btn question-btn-primary"
              onClick={handleImportCSV}
              disabled={
                !selectedFile ||
                importLoading
              }
            >

              {importLoading
                ? "⏳ Importing..."
                : "📥 Import Questions"}

            </button>


            <button
              type="button"
              className="question-btn question-btn-cancel"
              onClick={
                handleCancelImport
              }
              disabled={importLoading}
            >
              Cancel
            </button>

          </div>


          {/* IMPORT RESULT */}

          {importResult && (

            <div
              className={
                importResult.success
                  ? "csv-import-result"
                  : "csv-import-error"
              }
            >

              {importResult.success ? (

                <>

                  <h3>
                    Import Completed
                  </h3>


                  <div className="csv-result-stats">

                    <div className="csv-result-stat">

                      <span>
                        ✅
                      </span>

                      <strong>
                        {
                          importResult.imported
                        }
                      </strong>

                      <small>
                        Imported
                      </small>

                    </div>


                    <div className="csv-result-stat">

                      <span>
                        ❌
                      </span>

                      <strong>
                        {
                          importResult.failed
                        }
                      </strong>

                      <small>
                        Failed
                      </small>

                    </div>

                  </div>


                  {importResult.errors &&
                    importResult.errors.length >
                      0 && (

                    <div className="csv-error-list">

                      <h4>
                        Failed Rows
                      </h4>


                      {importResult.errors.map(
                        (
                          error,
                          index
                        ) => (

                          <p
                            key={index}
                          >
                            {error}
                          </p>

                        )
                      )}

                    </div>

                  )}

                </>

              ) : (

                <p>
                  ❌{" "}
                  {importResult.message}
                </p>

              )}

            </div>

          )}

        </div>

      )}


      {/* =================================================
          ADD / EDIT FORM
          ================================================= */}

      {(activeSection === "add" ||
        activeSection === "edit") && (

        <div className="question-card">

          <h2 className="question-card-title">

            {editingQuestion
              ? "Edit Question"
              : "Add New Question"}

          </h2>


          <form
            onSubmit={handleSubmit}
            className="question-form"
          >

            {/* QUESTION */}

            <div className="question-form-group">

              <label className="question-label">

                Question{" "}

                <span className="required-star">
                  *
                </span>

              </label>


              <textarea
                name="questionText"
                value={
                  formData.questionText
                }
                onChange={handleChange}
                placeholder="Enter the question"
                required
                rows={4}
                className="question-textarea"
              />

            </div>


            {/* CATEGORY / DIFFICULTY / TYPE */}

            <div className="question-form-row">

              <div className="question-form-group">

                <label className="question-label">

                  Category{" "}

                  <span className="required-star">
                    *
                  </span>

                </label>


                <input
                  type="text"
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={handleChange}
                  placeholder="e.g. Java"
                  required
                  className="question-input"
                />

              </div>


              <div className="question-form-group">

                <label className="question-label">
                  Difficulty
                </label>


                <select
                  name="difficulty"
                  value={
                    formData.difficulty
                  }
                  onChange={handleChange}
                  className="question-select"
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


              <div className="question-form-group">

                <label className="question-label">
                  Question Type
                </label>


                <select
                  name="type"
                  value={
                    formData.type
                  }
                  onChange={handleChange}
                  className="question-select"
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

            </div>


            {/* MCQ OPTIONS */}

            {formData.type === "MCQ" && (

              <>

                <div className="question-form-group">

                  <label className="question-label">

                    Options{" "}

                    <span className="required-star">
                      *
                    </span>

                  </label>


                  <div className="question-options-grid">

                    {/* A */}

                    <div className="question-option-group">

                      <span className="option-form-label">
                        A
                      </span>


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
                        className="question-input"
                      />

                    </div>


                    {/* B */}

                    <div className="question-option-group">

                      <span className="option-form-label">
                        B
                      </span>


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
                        className="question-input"
                      />

                    </div>


                    {/* C */}

                    <div className="question-option-group">

                      <span className="option-form-label">
                        C
                      </span>


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
                        className="question-input"
                      />

                    </div>


                    {/* D */}

                    <div className="question-option-group">

                      <span className="option-form-label">
                        D
                      </span>


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
                        className="question-input"
                      />

                    </div>

                  </div>

                </div>


                {/* CORRECT ANSWER */}

                <div className="question-form-group">

                  <label className="question-label">

                    Correct Answer{" "}

                    <span className="required-star">
                      *
                    </span>

                  </label>


                  <select
                    name="correctAnswer"
                    value={
                      formData.correctAnswer
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="question-select"
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

                </div>

              </>

            )}


            {/* CODING */}

            {formData.type === "CODING" && (

              <div className="question-info-box">

                <div className="question-info-icon">
                  💻
                </div>


                <div>

                  <strong>
                    Coding Question
                  </strong>


                  <p>
                    Enter the coding problem
                    in the question field.
                    Test cases and code
                    execution can be added
                    later.
                  </p>

                </div>

              </div>

            )}


            {/* DESCRIPTIVE */}

            {formData.type ===
              "DESCRIPTIVE" && (

              <div className="question-info-box">

                <div className="question-info-icon">
                  📝
                </div>


                <div>

                  <strong>
                    Descriptive Question
                  </strong>


                  <p>
                    Enter the descriptive
                    question and provide the
                    expected explanation or
                    answer below.
                  </p>

                </div>

              </div>

            )}


            {/* EXPLANATION */}

            <div className="question-form-group">

              <label className="question-label">

                Explanation{" "}

                <span className="required-star">
                  *
                </span>

              </label>


              <textarea
                name="explanation"
                value={
                  formData.explanation
                }
                onChange={handleChange}
                placeholder="Explain the correct answer"
                rows={4}
                className="question-textarea"
                required
              />

            </div>


            {/* FORM BUTTONS */}

            <div className="question-form-actions">

              <button
                type="submit"
                disabled={loading}
                className="question-btn question-btn-primary"
              >

                {loading
                  ? editingQuestion
                    ? "Saving..."
                    : "Adding..."
                  : editingQuestion
                  ? "💾 Save Changes"
                  : "➕ Add Question"}

              </button>


              <button
                type="button"
                onClick={
                  editingQuestion
                    ? handleCancelEdit
                    : handleViewQuestions
                }
                disabled={loading}
                className="question-btn question-btn-cancel"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}

export default AdminQuestions;

