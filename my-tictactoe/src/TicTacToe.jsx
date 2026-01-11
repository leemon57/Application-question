import React, { useState } from 'react';
import './TicTacToe.css';

// --- Helper Function: Determine Winner ---
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

// --- Component: Single Square ---
function Square({ value, onSquareClick, isWinningSquare }) {
  // Determine class names for styling based on value and winning state
  let className = "square";
  if (value === 'X') className += " x-player";
  if (value === 'O') className += " o-player";
  if (isWinningSquare) className += " winning-square";

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

// --- Component: Main Game Board ---
export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Check for winner or draw
  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const winningLine = winInfo ? winInfo.line : [];
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(i) {
    // Prevent clicking if square is filled or game is won
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Determine status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <h1 className="game-title">Tic Tac Toe</h1>
        
        <div className={`status-bar ${winner ? 'status-win' : ''}`}>
          {status}
        </div>

        <div className="board-grid">
          {/* Render 9 squares */}
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onSquareClick={() => handleClick(i)}
              isWinningSquare={winningLine.includes(i)}
            />
          ))}
        </div>

        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}