import _ from 'lodash';

const stylish = (diff) => {
  const inner = (diffTree, depth) => {
    const getIndent = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount - 2);
    const indent = getIndent(depth);
    const getDisplayValue = (value, ind, key, sign) => {
      if (!_.isObject(value)) return `${ind}${sign} ${key}: ${value}`;
      return `${ind}${sign} ${key}: {\n${inner(value, depth + 1)}\n${ind}  }`;
    };
    const result = diffTree.map((obj) => {
      const { type } = obj;
      switch (type) {
        case 'added': return getDisplayValue(obj.value, indent, obj.key, '+');
        case 'deleted': return getDisplayValue(obj.value, indent, obj.key, '-');
        case 'compared':
          return `${indent}  ${obj.key}: {\n${inner(obj.value, depth + 1)}\n${indent}  }`;
        case 'changed':
          if (_.isObject(obj.value1)) { return `${indent}- ${obj.key}: {\n${inner(obj.value1, depth + 1)}\n${indent}  }\n${indent}+ ${obj.key}: ${obj.value2}`; }
          if (_.isObject(obj.value2)) { return `${indent}- ${obj.key}: ${obj.value1}\n${indent}+ ${obj.key}: {\n${inner(obj.value2, depth + 1)}\n${indent}  }`; }
          return `${indent}- ${obj.key}: ${obj.value1}\n${indent}+ ${obj.key}: ${obj.value2}`;
        case 'unchanged':
          return `${indent}  ${obj.key}: ${obj.value}`;
        default: return getDisplayValue(obj.value, indent, obj.key, ' ');
      }
    });
    return result.join('\n');
  };
  return `{\n${inner(diff, 1)}\n}`;
};

export default stylish;
