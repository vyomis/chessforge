import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Chess } from "chess.js";
import ChessBoard from "../components/ChessBoard";

export default function Analysis() {
  const startingPosition = useMemo(() => new Chess(), []);

  const [game] = useState(startingPosition);
  const [moveIndex, setMoveIndex] = useState(0);

  const moves = [
    "e4",
    "e5",
    "Nf3",
    "Nc6",
    "Bc4",
    "Nf6",
    "O-O",
    "Be7",
  ];

  function goBack() {
    setMoveIndex((value) => Math.max(0, value - 1));
  }

  function goForward() {
    setMoveIndex((value) =>
      Math.min(moves.length, value + 1)
    );
  }

  return (
    <div className="page analysis-page">
      <section className="hero">
        <div>
          <span className="eyebrow">GAME REVIEW</span>
          <h1>Analysis board</h1>
          <p>Review positions and understand your decisions.</p>
        </div>

        <button className="secondary-button">
          <Sparkles size={17} />
          Analyze with engine
        </button>
      </section>

      <div className="analysis-layout">
        <div>
          <div className="evaluation-bar">
            <div className="evaluation-fill" />
            <span>+0.8</span>
          </div>

          <ChessBoard game={game} />

          <div className="analysis-controls">
            <button onClick={() => setMoveIndex(0)}>
              <RotateCcw size={17} />
            </button>

            <button onClick={goBack}>
              <ChevronLeft size={19} />
            </button>

            <div>
              {moveIndex} / {moves.length}
            </div>

            <button onClick={goForward}>
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <aside className="analysis-panel panel">
          <div className="analysis-panel-header">
            <span className="eyebrow">ENGINE</span>
            <strong>Depth 18</strong>
          </div>

          <div className="engine-score">
            <strong>+0.8</strong>
            <span>White advantage</span>
          </div>

          <div className="engine-line">
            <span>Best move</span>
            <strong>8. O-O</strong>
          </div>

          <div className="analysis-moves">
            {moves.map((move, index) => (
              <button
                key={`${move}-${index}`}
                className={index < moveIndex ? "played" : ""}
                onClick={() => setMoveIndex(index + 1)}
              >
                <span>{Math.floor(index / 2) + 1}.</span>
                {move}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}