import { Search, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { leaderboardPlayers } from "../data/chessData";
import { useAuth } from "../context/AuthContext";

export default function Players() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const players = useMemo(() => {
    return leaderboardPlayers.filter((player) =>
      player.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">SOCIAL</span>
          <h1>Find players.</h1>
          <p>Search the ChessForge community and discover opponents.</p>
        </div>
      </section>

      <div className="player-search-large">
        <Search size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by username..."
        />
      </div>

      <section className="players-grid">
        {players.map((player) => (
          <article className="player-card" key={player.id}>
            <img src={player.avatar} alt="" />

            <div className="player-card-info">
              <span>{player.title}</span>
              <h3>{player.username}</h3>
              <p>{player.rating} rating</p>
            </div>

            <button className="secondary-button">
              <UserPlus size={16} />
              Challenge
            </button>
          </article>
        ))}

        {players.length === 0 && (
          <div className="empty-state panel">
            <Users size={30} />
            <h3>No players found</h3>
            <p>Try another username.</p>
          </div>
        )}
      </section>
    </div>
  );
}