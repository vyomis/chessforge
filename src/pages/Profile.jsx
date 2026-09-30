import {
    CalendarDays,
    Gamepad2,
    Flame,
    Trophy,
    Target,
  } from "lucide-react";
  import { useParams } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { getUsers } from "../lib/storage";
  import UserAvatar from "../components/UserAvatar";
  
  export default function Profile() {
    const { username } = useParams();
    const { user: currentUser } = useAuth();
  
    const user =
      getUsers().find(
        (candidate) =>
          candidate.username.toLowerCase() === username.toLowerCase()
      ) || currentUser;
  
    const winRate =
      user.gamesPlayed > 0
        ? Math.round((user.wins / user.gamesPlayed) * 100)
        : 0;
  
    const joined = new Date(user.joinedAt).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  
    return (
      <div className="page profile-page">
        <section className="profile-hero">
          <div className="profile-hero-background" />
  
          <div className="profile-identity">
            <UserAvatar user={user} size="xl" />
  
            <div>
              <span className="eyebrow">CHESSFORGE PLAYER</span>
              <h1>{user.username}</h1>
              <div className="profile-meta">
                <span>
                  <CalendarDays size={15} />
                  Joined {joined}
                </span>
                <span>
                  <Trophy size={15} />
                  {user.rating} rating
                </span>
              </div>
            </div>
          </div>
        </section>
  
        <section className="profile-stat-grid">
          <div className="large-stat">
            <Trophy />
            <span>Current rating</span>
            <strong>{user.rating}</strong>
            <small>Peak {user.highestRating}</small>
          </div>
  
          <div className="large-stat">
            <Gamepad2 />
            <span>Games played</span>
            <strong>{user.gamesPlayed}</strong>
            <small>All time</small>
          </div>
  
          <div className="large-stat">
            <Target />
            <span>Win rate</span>
            <strong>{winRate}%</strong>
            <small>{user.wins} victories</small>
          </div>
  
          <div className="large-stat">
            <Flame />
            <span>Best streak</span>
            <strong>{user.bestStreak}</strong>
            <small>Consecutive wins</small>
          </div>
        </section>
  
        <section className="profile-columns">
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">PERFORMANCE</span>
                <h2>Game record</h2>
              </div>
            </div>
  
            <div className="record-bars">
              <div>
                <div>
                  <span>Wins</span>
                  <strong>{user.wins}</strong>
                </div>
                <div className="record-track">
                  <div
                    className="record-fill wins"
                    style={{
                      width: `${user.gamesPlayed ? (user.wins / user.gamesPlayed) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
  
              <div>
                <div>
                  <span>Draws</span>
                  <strong>{user.draws}</strong>
                </div>
                <div className="record-track">
                  <div
                    className="record-fill draws"
                    style={{
                      width: `${user.gamesPlayed ? (user.draws / user.gamesPlayed) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
  
              <div>
                <div>
                  <span>Losses</span>
                  <strong>{user.losses}</strong>
                </div>
                <div className="record-track">
                  <div
                    className="record-fill losses"
                    style={{
                      width: `${user.gamesPlayed ? (user.losses / user.gamesPlayed) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">RATING</span>
                <h2>Rating history</h2>
              </div>
            </div>
  
            <div className="rating-chart">
              <div className="chart-line">
                <span>Peak</span>
                <strong>{user.highestRating}</strong>
              </div>
              <div className="chart-visual">
                <div className="chart-point point-one" />
                <div className="chart-point point-two" />
                <div className="chart-point point-three" />
                <div className="chart-point point-four" />
                <div className="chart-point point-five" />
              </div>
              <div className="chart-current">
                <strong>{user.rating}</strong>
                <span>Current rating</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }