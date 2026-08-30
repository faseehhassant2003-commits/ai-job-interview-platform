import { BrowserRouter, Routes, Route } from "react-router-dom";

import Introduction from "./pages/Introduction";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import your other existing pages here
// import Dashboard from "./pages/Dashboard";
// import Admin from "./pages/Admin";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* INTRODUCTION / HOME PAGE */}
                <Route
                    path="/"
                    element={<Introduction />}
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* KEEP YOUR EXISTING ROUTES BELOW */}
                {/* 
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />
                */}

            </Routes>

        </BrowserRouter>
    );
}

export default App;