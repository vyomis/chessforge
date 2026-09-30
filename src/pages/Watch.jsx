import { Eye, Radio, Users } from "lucide-react";
import { featuredGames } from "../data/chessData";

export default function Watch() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">CHESS TV</span>
          <h1>Watch the best games.</h1>
          <p>Follow featured games and live tournaments.</p>
        </div>

        <div className="live-badge">
          <Radio size={14} />
          LIVE
        </div>
      </section>

      <section className="watch-grid">
        {featuredGames.map((game) => (
          <article className="watch-card" key={game.id}>
            <div className="watch-board">
              <div className="mini-board">
                {Array.from({ length: 64 }).map((_, index) => (
                  <div
                    key={index}
                    className={
                      Math.floor(index / 8) % 2 === index % 2
                        ? "mini-light"
                        : "mini-dark"
                    }
                  />
                ))}

                <span className="mini-piece mini-white">♔</span>
                <span className="mini-piece mini-black">♚</span>
              </div>

              <div className="watch-live">
                <Radio size={13} />
                LIVE
              </div>
            </div>

            <div className="watch-card-content">
              <div className="watch-players">
                <strong>{game.white}</strong>
                <span>vs</span>
                <strong>{game.black}</strong>
              </div>

              <div className="watch-meta">
                <span>{game.rating}</span>
                <span>
                  <Eye size={13} />
                  {game.viewers.toLocaleString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="watch-banner panel">
        <Users size={28} />
        <div>
          <span className="eyebrow">TOURNAMENTS</span>
          <h2>Live tournament broadcasts are coming soon.</h2>
        </div>
      </section>
    </div>
  );
}