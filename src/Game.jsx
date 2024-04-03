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
      <p>Current score: {currentScore}</p>
      <p>High score: {highScore}</p>
      <p>
        {gameStatus === 'game over' && 'Game over'}
        {gameStatus === 'win' && 'You win'}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {renderOrder.map((url) => (
          <div key={url} className="col-span-1 h-0 pb-[100%] relative overflow-hidden float-left box-border">
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
