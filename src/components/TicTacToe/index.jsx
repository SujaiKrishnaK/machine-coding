import { useContext, useState } from "react";
import { ToastContext } from "../../Contexts/toastContext";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
const TicTacToe = () => {
  const COLORS = {
    default: "aliceblue",
    X: "lightpink",
    O: "lightyellow",
  };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const isWon = (player, newBoard) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      console.log(player, "player");

      if (
        newBoard[a] === player &&
        newBoard[b] === player &&
        newBoard[c] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const onSquareClick = (player, index) => {
    if (board[index]) {
      alert("Invalid!");
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const hasWinner = isWon(player, newBoard);
    if (newBoard.every(Boolean)) {
      alert("Its Draw! Game Over!");
    }
    if (hasWinner) {
      setTimeout(() => {
        alert(`Player ${player} won!`);
        setBoard(Array(9).fill());
        setCurrentPlayer("X");
      }, 0);
    } else {
      setCurrentPlayer(player === "X" ? "O" : "X");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "2px",
        }}
      >
        {board.map((value, index) => {
          return (
            <button
              style={{
                height: "100px",
                width: "100px",
                fontSize: "24px",
                backgroundColor: COLORS[value] ?? COLORS.default,
                cursor: "pointer",
                borderRadius: "10px",
              }}
              onClick={() => onSquareClick(currentPlayer, index)}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default TicTacToe;
