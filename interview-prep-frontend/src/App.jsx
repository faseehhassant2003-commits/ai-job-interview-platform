import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import VerifyOtp from "./pages/VerifyOtp";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import History from "./pages/History";
import AdminQuestions from "./pages/AdminQuestions";
import AdminDashboard from "./pages/AdminDashboard";
import AIInterview from "./pages/AIInterview";
import Introduction from "./pages/Introduction";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================================
                    PUBLIC ROUTES
                ========================================= */}

                {/* Introduction / Landing Page */}

                <Route
                    path="/"
                    element={<Introduction />}
                />


                {/* Register */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* OTP Verification */}

                <Route
                    path="/verify-otp"
                    element={<VerifyOtp />}
                />


                {/* =========================================
                    PROTECTED ROUTES
                    SHARED NAVBAR + LAYOUT
                ========================================= */}

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    {/* =====================================
                        USER DASHBOARD
                    ===================================== */}

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    {/* =====================================
                        PRACTICE
                    ===================================== */}

                    <Route
                        path="/practice"
                        element={<Practice />}
                    />


                    {/* =====================================
                        HISTORY
                    ===================================== */}

                    <Route
                        path="/history"
                        element={<History />}
                    />


                    {/* =====================================
                        LEADERBOARD
                    ===================================== */}

                    <Route
                        path="/leaderboard"
                        element={<Leaderboard />}
                    />


                    {/* =====================================
                        AI INTERVIEW
                    ===================================== */}

                    <Route
                        path="/ai-interview"
                        element={<AIInterview />}
                    />


                    {/* =====================================
                        ADMIN DASHBOARD
                    ===================================== */}

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />


                    {/* =====================================
                        ADMIN QUESTION MANAGEMENT
                    ===================================== */}

                    <Route
                        path="/admin/questions"
                        element={<AdminQuestions />}
                    />

                </Route>


                {/* =========================================
                    FALLBACK
                ========================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;