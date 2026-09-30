import {
    ArrowRight,
    Flame,
    Gamepad2,
    History,
    Play,
    Puzzle,
    Trophy,
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { getGames } from "../lib/storage";
  import UserAvatar from "../components/UserAvatar";
  
  export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
  
    const games = getGames()
      .filter(
        (game) =>
          game.whiteId === user.id ||
          game.blackId === user.id
      )
      .slice(-5)
      .reverse();
  
    const winRate =
      user.gamesPlayed > 0
        ? Math.round((user.wins / user.gamesPlayed) * 100)
        : 0;
  
    return (
      <div className="page">
        <section className="hero">
          <div>
            <span className="eyebrow">YOUR CHESS DASHBOARD</span>
            <h1>
              Welcome back,{" "}
              <span className="gradient-text">{user.username}</span>
            </h1>
            <p>
              Ready for your next game?
            </p>
          </div>
  
          <button
            className="primary-button hero-play"
            onClick={() => navigate("/play")}
          >
            <Play size={19} fill="currentColor" />
            Play chess
          </button>
        </section>
  
        <section className="quick-play-grid">
          <button
            className="game-mode-card featured-mode"
            onClick={() => navigate("/play")}
          >
            <div className="mode-icon">
              <Gamepad2 />
            </div>
            <div>
              <span>QUICK MATCH</span>
              <h3>Play now</h3>
              <p>10 min • Rapid</p>
            </div>
            <ArrowRight />
          </button>
  
          <button className="game-mode-card">
            <div className="mode-icon purple">
              <Puzzle />
            </div>
            <div>
              <span>TRAIN</span>
              <h3>Solve puzzles</h3>
              <p>Improve your tactics</p>
            </div>
            <ArrowRight />
          </button>
        </section>
  
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Trophy size={19} />
            </div>
            <span>RATING</span>
            <strong>{user.rating}</strong>
            <small>Peak {user.highestRating}</small>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <Gamepad2 size={19} />
            </div>
            <span>GAMES</span>
            <strong>{user.gamesPlayed}</strong>
            <small>{user.wins} wins</small>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <Flame size={19} />
            </div>
            <span>STREAK</span>
            <strong>{user.currentStreak}</strong>
            <small>Best {user.bestStreak}</small>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <History size={19} />
            </div>
            <span>WIN RATE</span>
            <strong>{winRate}%</strong>
            <small>{user.losses} losses</small>
          </div>
        </section>
  
        <section className="dashboard-columns">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">RECENT ACTIVITY</span>
                <h2>Recent games</h2>
              </div>
              <button className="text-button">
                View all
                <ArrowRight size={16} />
              </button>
            </div>
  
            {games.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">♞</div>
                <h3>Your games will appear here</h3>
                <p>
                  Play your first game to start building your chess history.
                </p>
                <button
                  className="primary-button"
                  onClick={() => navigate("/play")}
                >
                  Start a game
                </button>
              </div>
            ) : (
              <div className="game-list">
                {games.map((game) => {
                  const isWhite = game.whiteId === user.id;
                  const opponent = isWhite
                    ? game.blackName
                    : game.whiteName;
  
                  return (
                    <div className="game-row" key={game.id}>
                      <div className="game-opponent-avatar">
                        {isWhite ? "♟" : "♙"}
                      </div>
                      <div className="game-opponent">
                        <strong>{opponent}</strong>
                        <span>{game.mode}</span>
                      </div>
                      <div
                        className={`game-result ${game.resultForUser}`}
                      >
                        {game.resultForUser === "win"
                          ? "WIN"
                          : game.resultForUser === "loss"
                          ? "LOSS"
                          : "DRAW"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
  
          <div className="panel profile-summary">
            <div className="profile-summary-top">
              <UserAvatar user={user} size="large" />
              <div>
                <span className="eyebrow">YOUR PROFILE</span>
                <h2>{user.username}</h2>
                <span className="rating-label">
                  {user.rating} rating
                </span>
              </div>
            </div>
  
            <div className="profile-record">
              <div>
                <strong>{user.wins}</strong>
                <span>Wins</span>
              </div>
              <div>
                <strong>{user.draws}</strong>
                <span>Draws</span>
              </div>
              <div>
                <strong>{user.losses}</strong>
                <span>Losses</span>
              </div>
            </div>
  
            <button
              className="secondary-button full-width"
              onClick={() => navigate(`/profile/${user.username}`)}
            >
              View full profile
            </button>
          </div>
        </section>
      </div>
    );
  }