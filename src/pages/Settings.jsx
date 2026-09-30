import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Monitor,
  Palette,
  Volume2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SETTINGS_KEY = "chessforge_settings";

export default function Settings() {
  const { user } = useAuth();

  const [settings, setSettings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
          sound: true,
          animations: true,
          coordinates: true,
          notifications: true,
          boardTheme: "forest",
        }
      );
    } catch {
      return {
        sound: true,
        animations: true,
        coordinates: true,
        notifications: true,
        boardTheme: "forest",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  function toggle(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">PREFERENCES</span>
          <h1>Settings</h1>
          <p>Customize your ChessForge experience.</p>
        </div>
      </section>

      <div className="settings-layout">
        <section className="settings-panel panel">
          <div className="settings-section">
            <div className="settings-heading">
              <Palette />
              <div>
                <h2>Board appearance</h2>
                <p>Choose how your games look.</p>
              </div>
            </div>

            <div className="theme-options">
              {["forest", "classic", "midnight"].map((theme) => (
                <button
                  key={theme}
                  className={`theme-option ${
                    settings.boardTheme === theme ? "selected" : ""
                  } ${theme}`}
                  onClick={() =>
                    setSettings((current) => ({
                      ...current,
                      boardTheme: theme,
                    }))
                  }
                >
                  <div className="theme-preview">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <strong>
                    {theme[0].toUpperCase() + theme.slice(1)}
                  </strong>

                  {settings.boardTheme === theme && (
                    <Check size={15} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-heading">
              <Monitor />
              <div>
                <h2>Game experience</h2>
                <p>Control gameplay behavior.</p>
              </div>
            </div>

            <SettingToggle
              title="Animations"
              description="Use movement and interface animations."
              enabled={settings.animations}
              onClick={() => toggle("animations")}
            />

            <SettingToggle
              title="Board coordinates"
              description="Show ranks and files around the board."
              enabled={settings.coordinates}
              onClick={() => toggle("coordinates")}
            />
          </div>

          <div className="settings-section">
            <div className="settings-heading">
              <Volume2 />
              <div>
                <h2>Audio</h2>
                <p>Control chess sounds.</p>
              </div>
            </div>

            <SettingToggle
              title="Game sounds"
              description="Play sounds for moves, captures and checks."
              enabled={settings.sound}
              onClick={() => toggle("sound")}
            />
          </div>

          <div className="settings-section">
            <div className="settings-heading">
              <Bell />
              <div>
                <h2>Notifications</h2>
                <p>Choose how ChessForge keeps you informed.</p>
              </div>
            </div>

            <SettingToggle
              title="Notifications"
              description="Receive game and social notifications."
              enabled={settings.notifications}
              onClick={() => toggle("notifications")}
            />
          </div>

          <div className="settings-account">
            <span className="eyebrow">SIGNED IN AS</span>
            <strong>{user.username}</strong>
            <span>{user.email}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onClick,
}) {
  return (
    <button className="setting-row" onClick={onClick}>
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <div className={`toggle ${enabled ? "on" : ""}`}>
        <div />
      </div>
    </button>
  );
}