import stylish from './stylish.js';
import plain from './plain.js';

const getStyleFormat = (type) => {
  const style = type;
  switch (style.format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      return stylish;
  }
};
export default getStyleFormat;
