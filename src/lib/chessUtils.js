export const TIME_CONTROLS = {
    bullet: {
      id: "bullet",
      name: "Bullet",
      description: "1 + 0",
      minutes: 1,
      increment: 0,
    },
    blitz: {
      id: "blitz",
      name: "Blitz",
      description: "3 + 2",
      minutes: 3,
      increment: 2,
    },
    rapid: {
      id: "rapid",
      name: "Rapid",
      description: "10 + 0",
      minutes: 10,
      increment: 0,
    },
    classical: {
      id: "classical",
      name: "Classical",
      description: "30 + 0",
      minutes: 30,
      increment: 0,
    },
  };
  
  export function formatClock(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = safeSeconds % 60;
  
    return `${minutes}:${remainder.toString().padStart(2, "0")}`;
  }
  
  export function getGameResult(game, userColor) {
    if (game.isCheckmate()) {
      const winner = game.turn() === "w" ? "b" : "w";
      return winner === userColor ? "win" : "loss";
    }
  
    if (
      game.isDraw() ||
      game.isStalemate() ||
      game.isThreefoldRepetition()
    ) {
      return "draw";
    }
  
    return null;
  }
  
  export function chooseBotMove(game) {
    const moves = game.moves({
      verbose: true,
    });
  
    if (!moves.length) {
      return null;
    }
  
    const checkingMoves = moves.filter((move) => move.san.includes("+"));
    const captures = moves.filter((move) => move.captured);
  
    if (checkingMoves.length) {
      return checkingMoves[Math.floor(Math.random() * checkingMoves.length)];
    }
  
    if (captures.length) {
      const valuableCaptures = captures.filter((move) =>
        ["q", "r", "b", "n"].includes(move.captured)
      );
  
      const pool = valuableCaptures.length ? valuableCaptures : captures;
  
      return pool[Math.floor(Math.random() * pool.length)];
    }
  
    const centerMoves = moves.filter((move) =>
      ["d4", "e4", "d5", "e5"].includes(move.to)
    );
  
    if (centerMoves.length) {
      return centerMoves[Math.floor(Math.random() * centerMoves.length)];
    }
  
    return moves[Math.floor(Math.random() * moves.length)];
  }
  
  export function resultLabel(result) {
    if (result === "win") return "WIN";
    if (result === "loss") return "LOSS";
    if (result === "draw") return "DRAW";
  
    return "IN PROGRESS";
  }