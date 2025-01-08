import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const getStyleFormat = (type) => {
  let format;
  if (_.isObject(type)) {
    format = Object.values(type).join();
  } else {
    format = type;
  }
  switch (format) {
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
