import { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";
import {
  Flag,
  RotateCcw,
  Settings2,
  Volume2,
  Zap,
  Timer,
  Crown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getGames,
  getUsers,
  saveGames,
  saveUsers,
} from "../lib/storage";
import ChessBoard from "../components/ChessBoard";
import {
  TIME_CONTROLS,
  chooseBotMove,
  formatClock,
} from "../lib/chessUtils";

export default function Play() {
  const { user, refreshUser } = useAuth();

  const [selectedMode, setSelectedMode] = useState("rapid");
  const [game, setGame] = useState(() => new Chess());
  const [lastMove, setLastMove] = useState(null);
  const [history, setHistory] = useState([]);
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);
  const [gameOver, setGameOver] = useState(false);
  const [resultText, setResultText] = useState("");
  const [showModes, setShowModes] = useState(true);
  const [thinking, setThinking] = useState(false);

  const mode = TIME_CONTROLS[selectedMode];

  const opponent = useMemo(
    () => ({
      username: "ChessBot",
      rating:
        selectedMode === "bullet"
          ? 1280
          : selectedMode === "blitz"
          ? 1320
          : selectedMode === "rapid"
          ? 1350
          : 1400,
    }),
    [selectedMode]
  );

  useEffect(() => {
    if (gameOver || showModes || thinking) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (game.turn() === "w") {
        setWhiteTime((value) => {
          if (value <= 1) {
            window.clearInterval(timer);
            finishGame("loss", "Time out — ChessBot wins");
            return 0;
          }

          return value - 1;
        });
      } else {
        setBlackTime((value) => {
          if (value <= 1) {
            window.clearInterval(timer);
            finishGame("win", "Time out — you win!");
            return 0;
          }

          return value - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [game, gameOver, showModes, thinking]);

  function updateStats(result) {
    const users = getUsers();
    const index = users.findIndex((candidate) => candidate.id === user.id);

    if (index === -1) {
      return;
    }

    const updated = {
      ...users[index],
      gamesPlayed: users[index].gamesPlayed + 1,
    };

    if (result === "win") {
      updated.wins += 1;
      updated.currentStreak += 1;
      updated.bestStreak = Math.max(
        updated.bestStreak,
        updated.currentStreak
      );
      updated.rating += 12;
      updated.highestRating = Math.max(
        updated.highestRating,
        updated.rating
      );
    }

    if (result === "loss") {
      updated.losses += 1;
      updated.currentStreak = 0;
      updated.rating = Math.max(100, updated.rating - 10);
    }

    if (result === "draw") {
      updated.draws += 1;
      updated.currentStreak = 0;
    }

    users[index] = updated;
    saveUsers(users);

    const games = getGames();

    games.push({
      id: `${Date.now()}-${Math.random()}`,
      whiteId: user.id,
      whiteName: user.username,
      blackId: "bot",
      blackName: opponent.username,
      mode: mode.name,
      timeControl: mode.description,
      result,
      resultForUser: result,
      moves: history,
      date: new Date().toISOString(),
    });

    saveGames(games);
    refreshUser();
  }

  function finishGame(result, message) {
    if (gameOver) {
      return;
    }

    setGameOver(true);
    setThinking(false);
    setResultText(message);

    updateStats(result);
  }

  function startGame(modeId = selectedMode) {
    const chosen = TIME_CONTROLS[modeId];

    setSelectedMode(modeId);
    setGame(new Chess());
    setHistory([]);
    setLastMove(null);
    setWhiteTime(chosen.minutes * 60);
    setBlackTime(chosen.minutes * 60);
    setGameOver(false);
    setResultText("");
    setThinking(false);
    setShowModes(false);
  }

  function handleMove(from, to) {
    if (gameOver || thinking || showModes || game.turn() !== "w") {
      return;
    }

    const nextGame = new Chess(game.fen());

    let move;

    try {
      move = nextGame.move({
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

    setGame(nextGame);
    setHistory((current) => [...current, move.san]);
    setLastMove({
      from: move.from,
      to: move.to,
    });

    if (mode.increment) {
      setWhiteTime((value) => value + mode.increment);
    }

    if (nextGame.isCheckmate()) {
      finishGame("win", "Checkmate — you win!");
      return;
    }

    if (
      nextGame.isDraw() ||
      nextGame.isStalemate() ||
      nextGame.isThreefoldRepetition()
    ) {
      finishGame("draw", "Draw game");
      return;
    }

    setThinking(true);

    window.setTimeout(() => {
      makeBotMove(nextGame);
    }, selectedMode === "bullet" ? 250 : 650);
  }

  function makeBotMove(position) {
    if (gameOver) {
      return;
    }

    const botGame = new Chess(position.fen());
    const move = chooseBotMove(botGame);

    if (!move) {
      setThinking(false);
      return;
    }

    const result = botGame.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion || "q",
    });

    setGame(botGame);
    setHistory((current) => [...current, result.san]);
    setLastMove({
      from: result.from,
      to: result.to,
    });

    if (mode.increment) {
      setBlackTime((value) => value + mode.increment);
    }

    setThinking(false);

    if (botGame.isCheckmate()) {
      finishGame("loss", "Checkmate — ChessBot wins");
      return;
    }

    if (
      botGame.isDraw() ||
      botGame.isStalemate() ||
      botGame.isThreefoldRepetition()
    ) {
      finishGame("draw", "Draw game");
    }
  }

  function resign() {
    finishGame("loss", "You resigned");
  }

  return (
    <div className="play-page">
      <div className="play-header">
        <div>
          <span className="eyebrow">PLAY CHESS</span>
          <h1>Choose your battle.</h1>
        </div>

        <button
          className="secondary-button"
          onClick={() => setShowModes((value) => !value)}
        >
          <Settings2 size={17} />
          Time control
        </button>
      </div>

      {showModes && (
        <div className="time-control-panel">
          {Object.values(TIME_CONTROLS).map((item) => (
            <button
              key={item.id}
              className={`time-control-card ${
                selectedMode === item.id ? "selected" : ""
              }`}
              onClick={() => startGame(item.id)}
            >
              <div className="time-control-icon">
                {item.id === "bullet" ? (
                  <Zap />
                ) : item.id === "classical" ? (
                  <Crown />
                ) : (
                  <Timer />
                )}
              </div>

              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      )}

      <div className="game-layout">
        <div className="game-main">
          <div className="game-player top-player">
            <div className="player-info">
              <div className="player-avatar bot-avatar">♞</div>
              <div>
                <strong>{opponent.username}</strong>
                <span>{opponent.rating}</span>
              </div>
            </div>

            <div
              className={`player-clock ${
                game.turn() === "b" ? "active-clock" : ""
              }`}
            >
              {formatClock(blackTime)}
            </div>
          </div>

          <div className="board-container">
            <ChessBoard
              game={game}
              onMove={handleMove}
              lastMove={lastMove}
            />

            {gameOver && (
              <div className="game-over-overlay">
                <div className="game-result-card">
                  <span className="result-piece">
                    {resultText.includes("win") ? "♕" : "♔"}
                  </span>

                  <span className="eyebrow">GAME COMPLETE</span>

                  <h2>{resultText}</h2>

                  <p>
                    {resultText.includes("win")
                      ? "+12 rating"
                      : resultText.includes("Draw")
                      ? "No rating change"
                      : "-10 rating"}
                  </p>

                  <div className="result-actions">
                    <button
                      className="primary-button"
                      onClick={() => startGame(selectedMode)}
                    >
                      <RotateCcw size={17} />
                      New game
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="game-player bottom-player">
            <div className="player-info">
              <div className="player-avatar you-avatar">♙</div>

              <div>
                <strong>{user.username}</strong>
                <span>{user.rating}</span>
              </div>
            </div>

            <div
              className={`player-clock ${
                game.turn() === "w" ? "active-clock" : ""
              }`}
            >
              {formatClock(whiteTime)}
            </div>
          </div>
        </div>

        <aside className="game-sidebar">
          <div className="game-sidebar-header">
            <div>
              <span className="eyebrow">{mode.name.toUpperCase()}</span>
              <h2>{mode.description}</h2>
            </div>

            <button className="icon-button">
              <Settings2 size={18} />
            </button>
          </div>

          <div className="move-list">
            {history.length === 0 ? (
              <div className="move-empty">
                <span>♟</span>
                <p>
                  {showModes
                    ? "Choose a time control"
                    : "Make your first move"}
                </p>
              </div>
            ) : (
              history.map((move, index) => (
                <div className="move-entry" key={`${move}-${index}`}>
                  <span>{Math.floor(index / 2) + 1}.</span>
                  <strong>{move}</strong>
                </div>
              ))
            )}
          </div>

          <div className="game-controls">
            <button
              className="secondary-button"
              onClick={resign}
              disabled={gameOver || showModes}
            >
              <Flag size={17} />
              Resign
            </button>

            <button className="secondary-button">
              <Volume2 size={17} />
              Sound
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}