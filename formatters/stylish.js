import _ from 'lodash';

const stylish = (diff) => {
  const inner = (diffTree, depth) => {
    const getIndent = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount - 2);
    const indent = getIndent(depth);
    const result = diffTree.map((obj) => {
      const {
        type, key, value, feature, value1, value2,
      } = obj;
      switch (type) {
        case 'unique':
          if (!_.isObject(value)) return `${indent}  ${key}: ${value}`;
          return `${indent}  ${key}: {\n${inner(value, depth + 1)}\n${indent}  }`;
        case 'added':
          if (!_.isObject(value)) return `${indent}+ ${key}: ${value}`;
          return `${indent}+ ${key}: {\n${inner(value, depth + 1)}\n${indent}  }`;
        case 'deleted':
          if (!_.isObject(value)) return `${indent}- ${key}: ${value}`;
          return `${indent}- ${key}: {\n${inner(value, depth + 1)}\n${indent}  }`;
        case 'changed':
          if (feature === 'compared') return `${indent}  ${key}: {\n${inner(value, depth + 1)}\n${indent}  }`;
          if (feature === 'firstObject') { return `${indent}- ${key}: {\n${inner(value1, depth + 1)}\n${indent}  }\n${indent}+ ${key}: ${value2}`; }
          if (feature === 'secondObject') { return `${indent}- ${key}: ${value1}\n${indent}+ ${key}: {\n${inner(value2, depth + 1)}\n${indent}  }`; }
          return `${indent}- ${key}: ${value1}\n${indent}+ ${key}: ${value2}`;
        case 'unchanged':
          return `${indent}  ${key}: ${value}`;
        default:
          return 'I am mistake';
      }
    });
    return result.join('\n');
  };
  return `{\n${inner(diff, 1)}\n}`;
};
export default stylish;
