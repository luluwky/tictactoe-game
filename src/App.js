import { useState } from 'react';

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const choices = ['Rock', 'Paper', 'Scissors'];
  const emojis = { Rock: '🪨', Paper: '📄', Scissors: '✂️' };

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * 3)];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'tie';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playGame = (choice) => {
    const computer = getComputerChoice();
    const winner = determineWinner(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(winner);

    if (winner === 'player') {
      setScore({ ...score, player: score.player + 1 });
    } else if (winner === 'computer') {
      setScore({ ...score, computer: score.computer + 1 });
    } else {
      setScore({ ...score, ties: score.ties + 1 });
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0, ties: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Rock Paper Scissors
        </h1>

        <div className="mb-6 text-center bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-around text-lg">
            <div>
              <p className="text-gray-600">You</p>
              <p className="text-2xl font-bold text-blue-600">{score.player}</p>
            </div>
            <div>
              <p className="text-gray-600">Ties</p>
              <p className="text-2xl font-bold text-gray-600">{score.ties}</p>
            </div>
            <div>
              <p className="text-gray-600">Computer</p>
              <p className="text-2xl font-bold text-red-600">{score.computer}</p>
            </div>
          </div>
        </div>

        {result && (
          <div className="mb-6 text-center">
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You chose</p>
                <div className="text-6xl">{emojis[playerChoice]}</div>
                <p className="text-lg font-semibold mt-2">{playerChoice}</p>
              </div>
              <div className="flex items-center">
                <span className="text-3xl">VS</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Computer chose</p>
                <div className="text-6xl">{emojis[computerChoice]}</div>
                <p className="text-lg font-semibold mt-2">{computerChoice}</p>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {result === 'player' && <p className="text-green-600">🎉 You Win!</p>}
              {result === 'computer' && <p className="text-red-600">😔 Computer Wins!</p>}
              {result === 'tie' && <p className="text-gray-600">🤝 It's a Tie!</p>}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-center text-gray-700 mb-4 font-semibold">
            Choose your weapon:
          </p>
          <div className="flex justify-center gap-4">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => playGame(choice)}
                className="flex flex-col items-center justify-center w-28 h-28 bg-gray-50 border-4 border-gray-300 
                           rounded-lg text-5xl hover:bg-gray-100 hover:border-blue-400 
                           transition-all duration-200 transform hover:scale-110"
              >
                {emojis[choice]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 
                     rounded-lg transition-colors duration-200"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
}