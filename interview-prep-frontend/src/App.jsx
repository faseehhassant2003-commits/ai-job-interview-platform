import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import History from "./pages/History";
import AdminQuestions from "./pages/AdminQuestions";

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


                {/* PROTECTED + SHARED NAVBAR */}

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
<Route
        path="/leaderboard"
        element={<Leaderboard />}
    />
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