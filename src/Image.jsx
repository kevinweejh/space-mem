import PropTypes from 'prop-types';

const Image = ({ url, guessArray, setGuessArray }) => {
  return (
    <button onClick={() => setGuessArray([...guessArray, url])}>
      <img src={url} alt="" className="absolute top-0 left-0 w-full h-full object-cover object-center"></img>
    </button>
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  guessArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  setGuessArray: PropTypes.func.isRequired,
};

export default Image;
