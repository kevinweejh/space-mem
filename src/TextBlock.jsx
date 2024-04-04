import PropTypes from 'prop-types';
import content from './assets/content.json';
import { marked } from 'marked';

const TextBlock = ({ activeIndex }) => {
  const contentMapping = {
    0: content.instructions,
    1: content.inspiration,
  };

  const activeContent = activeIndex !== null ? contentMapping[activeIndex] : null;
  const createMarkup = (text) => ({ __html: marked(text) });

  return (
    <>
      {activeIndex !== null && (
        <div className="text-[#f62f83] border border-[#f62f83] rounded-lg p-3 w-5/6 mb-4 md:w-1/2">
          <div className="font-semibold" dangerouslySetInnerHTML={createMarkup(activeContent.title)} />
          <br></br>
          <div dangerouslySetInnerHTML={createMarkup(activeContent.content)} />
        </div>
      )}
    </>
  );
};

TextBlock.propTypes = {
  activeIndex: PropTypes.number,
};

export default TextBlock;
