import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      login({ identifier, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-logo">♞</div>
          <h1>ChessForge</h1>
          <p>
            Play smarter. Improve faster. Build your chess identity.
          </p>

          <div className="auth-board-preview">
            {Array.from({ length: 64 }).map((_, index) => (
              <div
                key={index}
                className={Math.floor(index / 8) % 2 === index % 2 ? "light" : "dark"}
              >
                {index === 0 && "♜"}
                {index === 7 && "♜"}
                {index === 56 && "♖"}
                {index === 63 && "♖"}
                {index === 60 && "♔"}
                {index === 4 && "♚"}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in</h2>
          <p className="auth-subtitle">
            Continue your chess journey.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Username or email
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="yourname"
                  autoComplete="username"
                />
              </div>
            </label>

            <label>
              Password
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && <div className="form-error">{error}</div>}

            <button className="primary-button auth-submit">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")}>
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}