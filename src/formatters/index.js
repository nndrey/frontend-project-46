import stylish from './stylish.js';
import plain from './plain.js';

const formate = (data, type) => {
  switch (type) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format status: ${type}!`);
  }
};
export default formate;
