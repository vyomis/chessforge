import { useMemo, useState } from "react";
import { Check, Flame, Lightbulb, RotateCcw, Trophy } from "lucide-react";
import { Chess } from "chess.js";
import { puzzles } from "../data/chessData";
import ChessBoard from "../components/ChessBoard";

export default function Puzzles() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [game, setGame] = useState(
    () => new Chess(puzzles[0].fen)
  );
  const [solved, setSolved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");

  const puzzle = useMemo(
    () => puzzles[puzzleIndex],
    [puzzleIndex]
  );

  function loadPuzzle(index) {
    const next = puzzles[index];

    setPuzzleIndex(index);
    setGame(new Chess(next.fen));
    setSolved(false);
    setMessage("");
  }

  function handleMove(from, to) {
    if (solved) {
      return;
    }

    const next = new Chess(game.fen());

    let move;

    try {
      move = next.move({
        from,
        to,
        promotion: "q",
      });
    } catch {
      return;
    }

    if (!move) {
      return;
    }

    if (move.san === puzzle.solution[0]) {
      setGame(next);
      setSolved(true);
      setStreak((value) => value + 1);
      setMessage("Excellent! Puzzle solved.");
    } else {
      setStreak(0);
      setMessage("Not quite. Try another move.");
    }
  }

  return (
    <div className="page puzzle-page">
      <section className="hero">
        <div>
          <span className="eyebrow">TACTICAL TRAINING</span>
          <h1>Sharpen your instincts.</h1>
          <p>
            Solve positions, build your puzzle rating and extend your streak.
          </p>
        </div>

        <div className="puzzle-streak">
          <Flame size={20} />
          <div>
            <strong>{streak}</strong>
            <span>streak</span>
          </div>
        </div>
      </section>

      <div className="puzzle-layout">
        <section className="puzzle-board-panel">
          <ChessBoard
            game={game}
            onMove={handleMove}
          />
        </section>

        <section className="puzzle-info panel">
          <div className="puzzle-heading">
            <span className="eyebrow">PUZZLE {puzzleIndex + 1}</span>
            <h2>{puzzle.title}</h2>
            <div className="puzzle-tags">
              <span>{puzzle.theme}</span>
              <span>{puzzle.difficulty}</span>
              <span>{puzzle.rating}</span>
            </div>
          </div>

          <p>{puzzle.description}</p>

          <div
            className={`puzzle-message ${
              solved ? "success" : message ? "error" : ""
            }`}
          >
            {solved ? <Check size={18} /> : <Lightbulb size={18} />}
            <span>
              {message || "Find the best move."}
            </span>
          </div>

          <div className="puzzle-actions">
            <button
              className="secondary-button"
              onClick={() => loadPuzzle(puzzleIndex)}
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              className="primary-button"
              onClick={() =>
                loadPuzzle((puzzleIndex + 1) % puzzles.length)
              }
            >
              Next puzzle
            </button>
          </div>

          <div className="puzzle-stat">
            <Trophy size={18} />
            <div>
              <strong>1,250</strong>
              <span>Puzzle rating</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}