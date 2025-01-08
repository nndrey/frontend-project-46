import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const getStyleFormat = (type) => {
  const getFormat = (type) => {
    if (_.isObject(type)) {
      return Object.values(type).join();
    } else {
      return type;
    }
  };

  switch (getFormat(type)) {
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
