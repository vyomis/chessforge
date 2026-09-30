import { Medal, Search, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { leaderboardPlayers } from "../data/chessData";
import { useAuth } from "../context/AuthContext";

export default function Leaderboard() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const players = useMemo(() => {
    const combined = [
      ...leaderboardPlayers,
      {
        id: user.id,
        username: user.username,
        title: "YOU",
        rating: user.rating,
        country: "US",
        wins: user.wins,
        games: user.gamesPlayed,
        avatar: user.avatar,
      },
    ];

    return combined
      .filter((player) =>
        player.username.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.rating - a.rating);
  }, [query, user]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">GLOBAL RANKINGS</span>
          <h1>Leaderboard</h1>
          <p>See how players compare across ChessForge.</p>
        </div>
      </section>

      <section className="leaderboard-panel panel">
        <div className="leaderboard-toolbar">
          <div className="leaderboard-tabs">
            <button className="leaderboard-tab active">
              Global
            </button>
            <button className="leaderboard-tab">Rapid</button>
            <button className="leaderboard-tab">Blitz</button>
            <button className="leaderboard-tab">Bullet</button>
          </div>

          <div className="leaderboard-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a player..."
            />
          </div>
        </div>

        <div className="leaderboard-head">
          <span>#</span>
          <span>PLAYER</span>
          <span>RATING</span>
          <span>WINS</span>
          <span>GAMES</span>
        </div>

        <div className="leaderboard-list">
          {players.map((player, index) => (
            <div
              className={`leaderboard-row ${
                player.id === user.id ? "current-player" : ""
              }`}
              key={player.id}
            >
              <div className="rank">
                {index === 0 ? (
                  <Trophy size={18} />
                ) : index < 3 ? (
                  <Medal size={18} />
                ) : (
                  index + 1
                )}
              </div>

              <div className="leader-player">
                <img src={player.avatar} alt="" />
                <div>
                  <strong>
                    {player.title && (
                      <span className="player-title">
                        {player.title}
                      </span>
                    )}
                    {player.username}
                  </strong>
                  <span>{player.country}</span>
                </div>
              </div>

              <strong className="leader-rating">
                {player.rating}
              </strong>

              <span>{player.wins}</span>

              <span>{player.games}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}