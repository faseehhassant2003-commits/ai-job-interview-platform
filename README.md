# 🤖 PrepAI — AI-Powered Job & Interview Preparation Platform

<p align="center">
  <strong>An AI-powered full-stack platform for coding practice, mock interviews, and interview preparation.</strong>
</p>

<p align="center">
  <a href="https://prep-ai-frontend-5h31.onrender.com">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20PrepAI-success?style=for-the-badge" alt="Live Demo">
  </a>
</p>

---

## 🌟 Overview

**PrepAI** is a full-stack AI-powered job and interview preparation platform built
with **React** and **Spring Boot**.

The platform allows users to practice technical questions based on topic and
difficulty, track their attempts, participate in a competitive leaderboard,
and conduct AI-powered mock interviews.

It also includes an administration panel for managing the question bank and
platform content.

---

## 🚀 Live Demo

### 🌐 Try PrepAI

**[👉 Open PrepAI](https://ai-job-interview-platform-lilac.vercel.app)**

The application is deployed in production with the frontend hosted on Vercel,
the backend deployed on Render, and PostgreSQL hosted using Neon.

---

# ✨ Key Features

## 👨‍💻 Interview Preparation

- 🎯 Topic-based technical practice
- 🎚️ Difficulty-based question selection
- 📝 Technical question practice
- 📊 Attempt history
- 🏆 Competitive leaderboard
- 📚 Large technical question bank

---

## 🤖 AI Mock Interviews

- 🤖 AI-powered mock interview experience
- 💬 Interactive AI interview functionality
- 🧠 AI-generated interview responses
- ⚡ Groq API integration
- 🔐 Secure server-side AI API integration
- 🔑 API keys protected using environment variables

---

## 🔐 Authentication & Security

- 🔑 JWT-based authentication
- 🛡️ Spring Security
- 🔒 BCrypt password hashing
- 📧 Email OTP account verification
- 👥 Role-based authorization
- 👤 MEMBER role
- 👨‍💼 ADMIN role
- 🔐 Protected REST API endpoints

---

## 👨‍💼 Admin Panel

- ➕ Create questions
- ✏️ Update questions
- 🗑️ Delete questions
- 📥 Bulk CSV question import
- 📚 Question bank management
- 👥 Role-based administrative access

---

## 📚 Question Bank

The platform contains:

- **3,600+ questions**
- **12 technical topics**
- **3 difficulty levels**

---

# 🛠️ Technology Stack

## Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

- React
- React Router
- JavaScript
- HTML5
- CSS3

---

## Backend

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- JWT
- BCrypt

---

## 🗄️ Database

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

- PostgreSQL
- Neon

---

## 🤖 Artificial Intelligence

- Groq API
- AI-powered mock interviews
- LLM-powered interview interaction

---

## 🔧 Tools & Deployment

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

- Git
- GitHub
- Maven
- VS Code
- Vercel
- Render
- Neon

---

# 🏗️ System Architecture

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
          │      Neon        │              │  AI Interviews  │
          └──────────────────┘              └─────────────────┘
