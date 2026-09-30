import {
  BarChart3,
  BookOpen,
  Clock3,
  Home,
  Library,
  Play,
  Puzzle,
  Search,
  Settings,
  Trophy,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./UserAvatar";

const mainLinks = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Play", icon: Zap, path: "/play" },
  { label: "Puzzles", icon: Puzzle, path: "/puzzles" },
  { label: "Learn", icon: BookOpen, path: "/learn" },
  { label: "Watch", icon: Library, path: "/watch" },
];

const socialLinks = [
  { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
  { label: "Players", icon: Users, path: "/players" },
  { label: "Game History", icon: Clock3, path: "/history" },
  { label: "Analysis", icon: BarChart3, path: "/analysis" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  function renderLink({ label, icon: Icon, path }) {
    const active =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);

    return (
      <button
        key={label}
        className={`nav-item ${active ? "active" : ""}`}
        onClick={() => navigate(path)}
      >
        <Icon size={19} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => navigate("/")}>
        <span className="brand-piece">♞</span>
        <span>ChessForge</span>
      </button>

      <nav className="sidebar-nav">
        {mainLinks.map(renderLink)}
      </nav>

      <div className="sidebar-section-label">
        SOCIAL & TOOLS
      </div>

      <nav className="sidebar-nav">
        {socialLinks.map(renderLink)}
      </nav>

      <div className="sidebar-divider" />

      <button
        className={`nav-item ${
          location.pathname.startsWith("/profile")
            ? "active"
            : ""
        }`}
        onClick={() =>
          navigate(`/profile/${user.username}`)
        }
      >
        <UserRound size={19} />
        <span>Profile</span>
      </button>

      <button
        className={`nav-item ${
          location.pathname === "/settings" ? "active" : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <Settings size={19} />
        <span>Settings</span>
      </button>

      <div className="sidebar-spacer" />

      <button
        className="sidebar-user"
        onClick={() =>
          navigate(`/profile/${user.username}`)
        }
      >
        <UserAvatar user={user} size="small" />
        <div>
          <strong>{user.username}</strong>
          <span>{user.rating} rating</span>
        </div>
      </button>
    </aside>
  );
}