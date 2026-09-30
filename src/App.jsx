import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Learn from "./pages/Learn";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Play from "./pages/Play";
import Players from "./pages/Players";
import Profile from "./pages/Profile";
import Puzzles from "./pages/Puzzles";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Watch from "./pages/Watch";

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-piece">♞</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-shell">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/play" element={<Play />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/watch" element={<Watch />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route path="/players" element={<Players />} />
          <Route path="/history" element={<History />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route
            path="/profile/:username"
            element={<Profile />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          user ? <Navigate to="/" replace /> : <Register />
        }
      />

      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}