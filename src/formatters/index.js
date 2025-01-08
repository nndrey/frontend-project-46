import stylish from './stylish.js';
import plain from './plain.js';

const getStyleFormat = (type) => {
  const styleValue = Object.values(type).join();
  switch (styleValue) {
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
