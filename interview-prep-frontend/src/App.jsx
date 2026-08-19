import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminQuestions from "./pages/AdminQuestions";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/register" />}
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
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

              <Route
    path="/admin/questions"
    element={
        <ProtectedRoute adminOnly={true}>
            <AdminQuestions />
        </ProtectedRoute>
    }
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;