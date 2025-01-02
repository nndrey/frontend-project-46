import _ from 'lodash';
import isString from '../src/helpers.js';

const plain = (diff) => {
  const inner = (tree, pathFile) => {
    const result = tree.flatMap((obj) => {
      const {
        type, key, value, feature, value1, value2,
      } = obj;
      const resultPath = pathFile + key;
      switch (type) {
        case 'added': {
          let displayValue = isString(value) ? `'${value}'` : value;
          displayValue = _.isObject(displayValue) ? '[complex value]' : displayValue;
          return `Property '${resultPath}' was added with value: ${displayValue}`;
        }
        case 'deleted': {
          return `Property '${resultPath}' was removed`;
        }
        case 'changed':
          if (feature === undefined || feature === 'firstObject' || feature === 'secondObject') {
            let displayValue1 = isString(value1) ? `'${value1}'` : value1;
            displayValue1 = _.isObject(displayValue1) ? '[complex value]' : displayValue1;
            let displayValue2 = isString(value2) ? `'${value2}'` : value2;
            displayValue2 = _.isObject(displayValue2) ? '[complex value]' : displayValue2;
            return `Property '${resultPath}' was updated. From ${displayValue1} to ${displayValue2}`;
          }
          if (feature === 'compared') return inner(value, `${pathFile}${key}.`);
          return [];
        default:
          return [];
      }
    });
    return result;
  };
  return inner(diff, '').join('\n');
};

export default plain;
