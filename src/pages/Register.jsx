import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

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
          <h1>Build your chess identity.</h1>
          <p>
            Track your rating, games, streaks and progress in one place.
          </p>

          <div className="feature-stack">
            <div>
              <strong>1200</strong>
              <span>Starting rating</span>
            </div>
            <div>
              <strong>♟</strong>
              <span>Unlimited games</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Your progress is saved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card register-card">
          <span className="eyebrow">CREATE YOUR ACCOUNT</span>
          <h2>Join ChessForge</h2>
          <p className="auth-subtitle">
            Your chess profile starts here.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Username
              <div className="input-wrap">
                <User size={18} />
                <input
                  value={form.username}
                  onChange={(event) =>
                    update("username", event.target.value)
                  }
                  placeholder="KnightMaster"
                  autoComplete="username"
                />
              </div>
            </label>

            <label>
              Email
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </label>

            <label>
              Password
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    update("password", event.target.value)
                  }
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
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

            <label>
              Confirm password
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    update("confirmPassword", event.target.value)
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />
              </div>
            </label>

            {error && <div className="form-error">{error}</div>}

            <button className="primary-button auth-submit">
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}