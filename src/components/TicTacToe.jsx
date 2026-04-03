import './TicTacToe.css';
import Item from './Item';
import { useState } from 'react';
const TicTacToe = () => {
  const [board, setBoard] = useState([
    new Array(4).fill(''),
    new Array(4).fill(''),
    new Array(4).fill(''),
    new Array(4).fill(''),
  ]);

  const [playerOne, setPlayerOne] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const n = board.length;

    // helper to check a line
    const checkLine = (cells) => {
      const first = cells[0];
      if (!first) return null;
      return cells.every((cell) => cell === first) ? first : null;
    };

    // check rows
    for (let row of board) {
      const result = checkLine(row);
      if (result) return result;
    }

    // check columns
    for (let col = 0; col < n; col++) {
      const column = board.map((row) => row[col]);
      const result = checkLine(column);
      if (result) return result;
    }

    // main diagonal
    const diag = board.map((row, i) => row[i]);
    const diagResult = checkLine(diag);
    if (diagResult) return diagResult;

    // anti-diagonal
    const antiDiag = board.map((row, i) => row[n - i - 1]);
    const antiResult = checkLine(antiDiag);
    if (antiResult) return antiResult;

    return null;
  };

  const handleItemClick = (rowIndex, colIndex) => {
    const newBoard = board.map((row, r) =>
      row.map((cell, c) => {
        if (r === rowIndex && c === colIndex) {
          if (playerOne) return 'X';
          else return 'O';
        }
        return cell;
      })
    );

    setBoard(newBoard);
    setPlayerOne((prev) => !prev);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result === 'X' ? 'playerOne' : 'playerTwo');
    }
  };

  return (
    <>
      <div className="grid-container">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Item
              key={`${rowIndex}-${colIndex}`}
              value={board[rowIndex][colIndex]}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onClick={handleItemClick}
            />
          ))
        )}
      </div>
      {winner !== null && winner === 'playerOne' && <div>Player One Wins</div>}
      {winner !== null && winner === 'playerTwo' && <div>Player Two Wins</div>}
    </>
  );
};

export default TicTacToe;
