import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isBoardFull = board.every(cell => cell !== null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Tic Tac Toe
        </h1>
        
        <div className="mb-6 text-center">
          {winner ? (
            <p className="text-2xl font-semibold text-green-600">
              🎉 Player {winner} wins!
            </p>
          ) : isBoardFull ? (
            <p className="text-2xl font-semibold text-orange-600">
              It's a draw!
            </p>
          ) : (
            <p className="text-xl text-gray-700">
              Next player: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 bg-gray-50 border-4 border-gray-300 rounded-lg text-5xl font-bold
                         hover:bg-gray-100 transition-colors duration-200
                         flex items-center justify-center
                         disabled:cursor-not-allowed"
              disabled={cell !== null || winner !== null}
            >
              <span className={cell === 'X' ? 'text-blue-600' : 'text-red-600'}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 
                     rounded-lg transition-colors duration-200"
        >
          New Game
        </button>
      </div>
    </div>
  );
}