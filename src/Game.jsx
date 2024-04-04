import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from './Image';

const Game = ({ currentScore, setCurrentScore, highScore, setHighScore, urlArray, gameStatus, setGameStatus }) => {
  const [guessArray, setGuessArray] = useState([]);
  const [renderOrder, setRenderOrder] = useState([]);

  const updateHighScore = () => {
    setHighScore(currentScore > highScore ? currentScore : highScore);
  };

  // Check for mistake
  useEffect(() => {
    const hasDuplicates = new Set(guessArray).size !== guessArray.length;
    if (hasDuplicates) {
      updateHighScore();
      setGameStatus('game over');
      console.log('over');
      setCurrentScore(0);
      setGuessArray([]);
    }
  }, [guessArray, setGuessArray, currentScore, setCurrentScore, highScore, setHighScore, setGameStatus]);

  useEffect(() => {
    setCurrentScore(guessArray.length);
  }, [guessArray, setCurrentScore]);

  useEffect(() => {
    // Check for win
    const hasWon = currentScore === urlArray.length;
    if (hasWon) {
      updateHighScore();
      setGameStatus('win');
      setCurrentScore(0);
      setGuessArray([]);
    }
  }, [guessArray, setGuessArray, urlArray, currentScore, setCurrentScore, highScore, setHighScore, setGameStatus]);

  // Shuffle the urls
  useEffect(() => {
    if (gameStatus === 'playing') {
      const shuffleUrls = () => {
        let shuffled = [...urlArray].sort(() => 0.5 - Math.random());
        setRenderOrder(shuffled);
      };

      shuffleUrls();
    }
  }, [urlArray, guessArray]);

  return (
    <>
      <p className="text-[#f62f83] text-lg font-semibold">Current score: {currentScore}</p>
      <p className="text-[#f62f83] text-lg font-semibold">High score: {highScore}</p>
      <hr></hr>
      <div className="h-max">
        <p className="text-[#f62f83] text-lg font-semibold">
          {gameStatus === 'game over' ? (gameStatus === 'win' ? '--- You Win ---' : '--- Game Over ---') : ''}
        </p>
      </div>

      <div className="mt-4 w-screen grid grid-cols-2 md:grid-cols-4">
        {renderOrder.map((url) => (
          <div key={url} className="col-span-1 aspect-square relative rounded-md m-3 border-[#f62f83] border-8">
            <Image url={url} guessArray={guessArray} setGuessArray={setGuessArray} />
          </div>
        ))}
      </div>
    </>
  );
};

Game.propTypes = {
  currentScore: PropTypes.number.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
  highScore: PropTypes.number.isRequired,
  setHighScore: PropTypes.func.isRequired,
  urlArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  gameStatus: PropTypes.string.isRequired,
  setGameStatus: PropTypes.func.isRequired,
};

export default Game;
