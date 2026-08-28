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
import AIInterview from "./pages/AIInterview";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />
                

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/verify-otp"
                    element={<VerifyOtp />}
                />


                {/* PROTECTED + SHARED NAVBAR */}

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/practice"
                        element={<Practice />}
                    />

                    <Route
                        path="/history"
                        element={<History />}
                    />

                    <Route
                        path="/leaderboard"
                        element={<Leaderboard />}
                    />

                    {/* AI INTERVIEW */}

                    <Route
                        path="/ai-interview"
                        element={<AIInterview />}
                    />

                    <Route
                        path="/admin/questions"
                        element={<AdminQuestions />}
                    />

                </Route>


                {/* FALLBACK */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;