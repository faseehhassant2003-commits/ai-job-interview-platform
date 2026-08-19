import Navbar from "../components/Navbar";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    return (
        <div className="dashboard-page">

            <Navbar />

            <main className="dashboard-main">
<>
    <Sidebar />

    {/* your existing dashboard content */}
</>
                <h1>
                    Welcome to Interview Prep 👋
                </h1>

                <p>
                    Start preparing for your interviews.
                </p>

            </main>

        </div>
    );
}

export default Dashboard;