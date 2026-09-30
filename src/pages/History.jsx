import { Calendar, ChevronRight, Clock3, Gamepad2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getGames } from "../lib/storage";

export default function History() {
  const { user } = useAuth();

  const games = getGames()
    .filter(
      (game) =>
        game.whiteId === user.id ||
        game.blackId === user.id
    )
    .reverse();

  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">YOUR RECORD</span>
          <h1>Game history</h1>
          <p>Every game you play is saved to your profile.</p>
        </div>
      </section>

      <section className="history-panel panel">
        {games.length === 0 ? (
          <div className="empty-state">
            <Gamepad2 size={32} />
            <h3>No games yet</h3>
            <p>Play a game and your history will appear here.</p>
          </div>
        ) : (
          <div className="history-list">
            {games.map((game) => {
              const opponent =
                game.whiteId === user.id
                  ? game.blackName
                  : game.whiteName;

              return (
                <div className="history-row" key={game.id}>
                  <div className={`history-result ${game.resultForUser}`}>
                    {game.resultForUser === "win"
                      ? "W"
                      : game.resultForUser === "loss"
                      ? "L"
                      : "D"}
                  </div>

                  <div className="history-opponent">
                    <strong>{opponent}</strong>
                    <span>
                      <Clock3 size={13} />
                      {game.timeControl || game.mode}
                    </span>
                  </div>

                  <div className="history-mode">
                    <span>{game.mode}</span>
                    <small>
                      <Calendar size={12} />
                      {new Date(game.date).toLocaleDateString()}
                    </small>
                  </div>

                  <button className="history-action">
                    <ChevronRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}