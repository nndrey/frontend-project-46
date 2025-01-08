import _ from 'lodash';
import isString from '../helpers.js';

const getDisplayValue = (value) => {
  if (isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const plain = (diff) => {
  const inner = (tree, pathFile) => {
    const result = tree.flatMap((obj) => {
      const { type, key } = obj;
      const resultPath = pathFile + key;
      switch (type) {
        case 'added': return `Property '${resultPath}' was added with value: ${getDisplayValue(obj.value)}`;
        case 'deleted': return `Property '${resultPath}' was removed`;
        case 'changed': return `Property '${resultPath}' was updated. From ${getDisplayValue(obj.value1)} to ${getDisplayValue(obj.value2)}`;
        case 'compared': return inner(obj.value, `${pathFile}${key}.`);
        default:
          return [];
      }
    });
    return result;
  };
  return inner(diff, '').join('\n');
};
export default plain;
