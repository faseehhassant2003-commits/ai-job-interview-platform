# 🤖 PrepAI — AI-Powered Job & Interview Preparation Platform

<p align="center">

**An AI-powered full-stack platform for coding practice, mock interviews, and interview preparation.**

<a href="https://ai-job-interview-platform-lilac.vercel.app/login">
  <strong>🚀 Live Demo</strong>
</a>

</p>

---

## 🌟 Overview

**PrepAI** is a full-stack AI-powered job and interview preparation platform built with **React** and **Spring Boot**.

The platform allows users to practice technical questions based on topic and difficulty, track their attempts, participate in a competitive leaderboard, and conduct AI-powered mock interviews.

It also includes an administration panel for managing the question bank and platform content.

---

## 🚀 Live Demo

### 🌐 Try PrepAI

👉 **https://ai-job-interview-platform-lilac.vercel.app/login**

> The application is deployed in production with the frontend hosted on Vercel and the backend connected to the production environment.

---

# ✨ Key Features

## 👨‍💻 Interview Preparation

* 🎯 Topic-based technical practice
* 🎚️ Difficulty-based question selection
* 📝 Coding and technical questions
* 📊 Attempt history
* 🏆 Competitive leaderboard
* 📚 Large technical question bank

## 🤖 AI Mock Interviews

* AI-powered mock interview experience
* Dynamic interview interaction
* AI-generated interview responses
* Groq API integration
* Secure server-side API integration
* API keys managed through environment variables

## 🔐 Authentication & Security

* JWT-based authentication
* Spring Security
* BCrypt password hashing
* Email OTP account verification
* Role-based authorization
* Separate MEMBER and ADMIN permissions
* Protected REST APIs

## 👨‍💼 Admin Panel

* Question management
* Create questions
* Update questions
* Delete questions
* Bulk CSV question import
* Question bank administration
* Role-based administrative access

## 📚 Question Bank

The platform contains:

* **3,600+ questions**
* **12 technical topics**
* **3 difficulty levels**

---

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* React Router
* HTML5
* CSS3

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST APIs
* JWT
* BCrypt

## Database

* PostgreSQL
* Neon

## AI

* Groq API

## Deployment

* Vercel
* Render
* Neon

## Development Tools

* Git
* GitHub
* Maven
* VS Code

---

# 🏗️ Project Architecture

```text
                         ┌──────────────────────┐
                         │      User / Admin     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │       Vercel         │
                         └──────────┬───────────┘
                                    │
                              REST API / JWT
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Spring Boot API    │
                         │       Render         │
                         └───────┬──────┬───────┘
                                 │      │
                    ┌────────────┘      └─────────────┐
                    ▼                                 ▼
          ┌──────────────────┐              ┌─────────────────┐
          │   PostgreSQL     │              │    Groq API     │
          │      Neon        │              │   AI Interviews │
          └──────────────────┘              └─────────────────┘
```

---

# 🔐 Authentication Flow

```text
User
 │
 ▼
Login / Registration
 │
 ▼
Spring Security
 │
 ▼
JWT Authentication
 │
 ▼
Protected REST API
 │
 ▼
Role Authorization
 │
 ├── MEMBER
 │
 └── ADMIN
```

Passwords are protected using **BCrypt**, while JWT tokens are used to secure authenticated API requests.

---

# 📂 Repository Structure

```text
ai-job-interview-platform/
│
├── interview-prep-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── interview-prep-backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── README.md
```

---

# ⚙️ Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/faseehhassant2003-commits/ai-job-interview-platform.git
```

```bash
cd ai-job-interview-platform
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd interview-prep-backend
```

Configure the required environment variables and database connection.

Then run:

```bash
mvn spring-boot:run
```

The Spring Boot backend will start locally.

---

## 3. Frontend Setup

Open another terminal:

```bash
cd interview-prep-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will then be available through the local Vite development server.

---

# 🔑 Environment Variables

Sensitive credentials should **never be committed to GitHub**.

Example backend configuration:

```text
DATABASE_URL=your_database_url
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_email_password
```

Use environment variables for production secrets and API credentials.

---

# 📊 Main Modules

| Module            | Description                                |
| ----------------- | ------------------------------------------ |
| 👤 Authentication | Registration, login and JWT authentication |
| 🔐 Security       | Spring Security, BCrypt and authorization  |
| 🎯 Practice       | Topic and difficulty-based practice        |
| 📊 Attempts       | Track user practice history                |
| 🏆 Leaderboard    | Competitive ranking system                 |
| 🤖 AI Interview   | AI-powered mock interviews                 |
| 👨‍💼 Admin       | Question management                        |
| 📥 CSV Import     | Bulk question importing                    |
| 📚 Question Bank  | 3,600+ technical questions                 |

---

# 🚀 Deployment

The application is deployed using:

```text
Frontend  → Vercel
Backend   → Render
Database  → Neon PostgreSQL
AI        → Groq API
```

### 🌐 Production Application

👉 **https://ai-job-interview-platform-lilac.vercel.app/login**

---

# 🔒 Security Considerations

The application implements several security mechanisms:

* JWT authentication
* Spring Security
* BCrypt password hashing
* Role-based authorization
* Protected REST endpoints
* Server-side AI API integration
* Environment-based secret management
* Email OTP verification

The Groq API key is kept on the backend rather than exposed directly to the frontend.

---

# 📈 Project Highlights

### 3,600+

Technical Questions

### 12

Technical Topics

### 3

Difficulty Levels

### 2

User Roles — MEMBER & ADMIN

---

# 🎯 Future Improvements

Potential future enhancements include:

* 📄 AI resume analysis
* 🎯 Personalized interview roadmaps
* 📈 Advanced performance analytics
* 🧠 Adaptive question recommendations
* 💼 Job recommendation system
* 🎤 Voice-based mock interviews
* 📊 More detailed recruiter-style analytics

---

# 👨‍💻 Author

## Faseeh Hassan

🎓 Computer Science & Engineering

🌐 **Portfolio:**
https://portfolio-r0uq.onrender.com

💻 **GitHub:**
https://github.com/faseehhassant2003-commits

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**Thanks for visiting! 🚀**
