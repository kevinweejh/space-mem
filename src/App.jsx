import { useState, useEffect } from 'react';
import Game from './Game';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [urlArray, setUrlArray] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [gameStatus, setGameStatus] = useState('playing');

  const apiKey = import.meta.env.VITE_API_KEY;

  const getApods = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=4&thumbs=true`);
    const dataObj = await response.json();
    const filteredDataObj = dataObj.filter((item) => item.media_type === 'image');
    const dataList = filteredDataObj.map((item) => item.url);
    return dataList;
  };

  // For initial fetch
  useEffect(() => {
    getApods()
      .then((fetchedUrlArray) => {
        setUrlArray(fetchedUrlArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensure effect run only once on mount

  // For restarting the game
  useEffect(() => {
    if (gameStatus === 'game over' || gameStatus === 'win') {
      getApods()
        .then((fetchedUrlArray) => {
          setUrlArray(fetchedUrlArray);
          setGameStatus('playing');
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [gameStatus]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <>
      <div className="bg-[#fdef87] relative min-h-screen flex flex-col items-center">
        <img src="src/assets/space-mem.png" alt="rocket logo" className="w-3/4 md:w-1/4"></img>
        <Game
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
          highScore={highScore}
          setHighScore={setHighScore}
          urlArray={urlArray}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      </div>
    </>
  );
}

export default App;
