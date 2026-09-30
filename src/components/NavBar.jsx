import { LogOut, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <button className="mobile-brand" onClick={() => navigate("/")}>
        ♞ <span>ChessForge</span>
      </button>

      <div className="topbar-search">
        <Search size={17} />
        <input placeholder="Search players, games, puzzles..." />
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          onClick={() => navigate("/settings")}
          title="Settings"
        >
          <Settings size={19} />
        </button>

        <button
          className="profile-chip"
          onClick={() => navigate(`/profile/${user.username}`)}
        >
          <UserAvatar user={user} size="small" />
          <div>
            <strong>{user.username}</strong>
            <span>{user.rating}</span>
          </div>
        </button>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={17} />
          <span>Log out</span>
        </button>
      </div>
    </header>
  );
}