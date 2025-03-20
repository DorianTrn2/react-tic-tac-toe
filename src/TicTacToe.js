import React, { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null)); // board
  const [xPlayer, setXPlayer] = useState(Math.random() < 0.5); // player X or O

  const calculateWinner = (squares) => {
    const lines = [ // winning combinations
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // if every square has the same symbol
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const boardCopy = [...board]; // working with a copy of the board
    if (calculateWinner(boardCopy) || boardCopy[i]) return; // if winner or square already filled

    // a bit of animation, yeaaaah
    const square = document.getElementById("square"+i); 
    square.style.animation = 'square-animation 0.5s'; 
    setTimeout(() => {
      square.style.animation = 'none';
    }, 500);

    boardCopy[i] = xPlayer ? 'X' : 'O'; // set with actual player symbol
    setBoard(boardCopy); // update the board
    setXPlayer(!xPlayer); // switch to the other player
  };


  const Square = ({ value }) => {
    const handleSquareClick = () => { // handle click event 
      handleClick(value);
    };
    return (
      <button className={"square"+(board[value] ? " filled" : "")} id={"square"+value} onClick={handleSquareClick}>
        {board[value]} {/* display the value of the square */}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}` // there is a winner
    : board.every(square => square) // no winner
    ? "It's a draw!" // no winner and no empty squares = draw
    : `Next player: ${xPlayer ? 'X' : 'O'}`; // no winner and there are empty squares = next player

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // reset the board
    setXPlayer(Math.random() < 0.5); // reset the player
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={0} />
          <Square value={1} />
          <Square value={2} />
        </div>
        <div className="board-row">
          <Square value={3} />
          <Square value={4} />
          <Square value={5} />
        </div>
        <div className="board-row">
          <Square value={6} />
          <Square value={7} />
          <Square value={8} />
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe; 