import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const getStyleFormat = (type) => {
  const getFormat = (value) => {
    if (_.isObject(value)) return Object.values(value).join();
    return value;
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
