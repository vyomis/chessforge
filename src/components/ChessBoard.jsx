import { useMemo } from "react";
import { Crown, Circle } from "lucide-react";

const PIECES = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getSquareName(row, col, orientation) {
  const file = orientation === "white" ? FILES[col] : FILES[7 - col];
  const rank = orientation === "white" ? 8 - row : row + 1;

  return `${file}${rank}`;
}

function getPieceColor(piece) {
  if (!piece) return null;
  return piece.color === "w" ? "white" : "black";
}

function Piece({ piece }) {
  if (!piece) return null;

  const symbol = PIECES[piece.type];

  if (!symbol) return null;

  return (
    <span
      className={`chess-piece ${
        piece.color === "w" ? "piece-white" : "piece-black"
      }`}
      aria-label={`${piece.color === "w" ? "white" : "black"} ${
        piece.type
      }`}
    >
      {symbol}
    </span>
  );
}

function Coordinate({ type, value }) {
  return (
    <span className={`board-coordinate board-coordinate-${type}`}>
      {value}
    </span>
  );
}

export default function ChessBoard({
  board = [],
  selectedSquare = null,
  legalMoves = [],
  lastMove = null,
  orientation = "white",
  onSquareClick,
  disabled = false,
  showCoordinates = true,
  checkSquare = null,
  boardTheme = "classic",
}) {
  const rows = useMemo(() => {
    if (!Array.isArray(board) || board.length !== 8) {
      return Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () => null),
      );
    }

    return orientation === "white" ? board : [...board].reverse().map((row) => [...row].reverse());
  }, [board, orientation]);

  const legalMoveMap = useMemo(() => {
    const map = new Map();

    if (!Array.isArray(legalMoves)) {
      return map;
    }

    legalMoves.forEach((move) => {
      if (!move) return;

      if (typeof move === "string") {
        map.set(move, {
          capture: false,
          promotion: false,
        });
        return;
      }

      if (move.to) {
        map.set(move.to, {
          capture: Boolean(move.captured || move.capture),
          promotion: Boolean(move.promotion),
        });
      }
    });

    return map;
  }, [legalMoves]);

  const getLastMoveState = (square) => {
    if (!lastMove) return false;

    if (typeof lastMove === "string") {
      return lastMove === square;
    }

    return lastMove.from === square || lastMove.to === square;
  };

  const handleSquareClick = (square) => {
    if (disabled || !onSquareClick) return;

    onSquareClick(square);
  };

  return (
    <div
      className={`chess-board-shell board-theme-${boardTheme} orientation-${orientation} ${
        disabled ? "board-disabled" : ""
      }`}
    >
      <div className="chess-board">
        {rows.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const square = getSquareName(rowIndex, colIndex, orientation);

            const isSelected = selectedSquare === square;
            const legalMove = legalMoveMap.get(square);
            const isLegalMove = Boolean(legalMove);
            const isLastMove = getLastMoveState(square);
            const isCheck = checkSquare === square;

            const isLightSquare =
              (rowIndex + colIndex) % 2 === 0;

            const fileIndex =
              orientation === "white" ? colIndex : 7 - colIndex;

            const rank =
              orientation === "white"
                ? 8 - rowIndex
                : rowIndex + 1;

            const showFileCoordinate =
              showCoordinates && rowIndex === 7;

            const showRankCoordinate =
              showCoordinates && colIndex === 0;

            const squareClassName = [
              "chess-square",
              isLightSquare ? "square-light" : "square-dark",
              isSelected ? "square-selected" : "",
              isLegalMove ? "square-legal" : "",
              isLastMove ? "square-last-move" : "",
              isCheck ? "square-check" : "",
              piece ? `square-piece-${getPieceColor(piece)}` : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={square}
                type="button"
                className={squareClassName}
                onClick={() => handleSquareClick(square)}
                disabled={disabled}
                aria-label={`Chess square ${square}`}
              >
                {isLastMove && (
                  <span
                    className="last-move-overlay"
                    aria-hidden="true"
                  />
                )}

                {isCheck && (
                  <span
                    className="check-overlay"
                    aria-hidden="true"
                  />
                )}

                {isLegalMove && (
                  <>
                    {legalMove.capture ? (
                      <span
                        className="legal-capture-ring"
                        aria-hidden="true"
                      >
                        <Circle size={54} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span
                        className="legal-move-dot"
                        aria-hidden="true"
                      />
                    )}

                    {legalMove.promotion && (
                      <span
                        className="promotion-indicator"
                        aria-hidden="true"
                      >
                        <Crown size={12} />
                      </span>
                    )}
                  </>
                )}

                <Piece piece={piece} />

                {showRankCoordinate && (
                  <Coordinate type="rank" value={rank} />
                )}

                {showFileCoordinate && (
                  <Coordinate
                    type="file"
                    value={FILES[fileIndex]}
                  />
                )}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}