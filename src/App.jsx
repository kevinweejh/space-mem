import { useState, useEffect } from 'react';
import Game from './Game';
import TextBlock from './TextBlock';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [urlArray, setUrlArray] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [gameStatus, setGameStatus] = useState('playing');

  const [activeIndex, setActiveIndex] = useState(null);

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

  const handleButtonPress = (index) => {
    if (activeIndex === null) {
      setActiveIndex(index);
      return;
    }

    if (activeIndex !== index) {
      setActiveIndex(index);
      return;
    }

    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }
  };

  return (
    <>
      <div className="bg-[#fdef87] relative min-h-screen flex flex-col items-center">
        <img src="src/assets/space-mem.png" alt="rocket logo" className="w-3/4 md:w-1/4"></img>
        <div className="flex gap-4 mb-4">
          <button
            className="text-[#f62f83] border border-[#f62f83] rounded-full py-2 px-4 hover:bg-gray-200"
            onClick={() => handleButtonPress(0)}
          >
            Instructions
          </button>
          <button
            className="text-[#f62f83] border border-[#f62f83] rounded-full py-2 px-4 hover:bg-gray-200"
            onClick={() => handleButtonPress(1)}
          >
            Inspiration
          </button>
        </div>
        <TextBlock activeIndex={activeIndex} />
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
