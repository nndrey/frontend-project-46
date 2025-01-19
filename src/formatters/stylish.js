import _ from 'lodash';

const stylish = (diff) => {
  const inner = (diffTree, depth) => {
    const getIndent = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount - 2);
    const indent = getIndent(depth);

    const getValue = (val) => {
      if (!_.isPlainObject(val)) return val;
      const result = Object
        .entries(val)
        .map(([key, value]) => {
          if (_.isPlainObject(value)) return { key, type: 'added or deleted', value: getValue(value) };
          return ({ key, type: 'added or deleted', value });
        });
      return result;
    };

    const getDisplayValue = (value, ind, key, sign) => {
      if (!_.isObject(value)) return `${ind}${sign} ${key}: ${value}`;
      return `${ind}${sign} ${key}: {\n${inner(getValue(value), depth + 1)}\n${ind}  }`;
    };

    const getDisplayValueChanged = (key, value1, value2, ind) => {
      if (_.isObject(value1)) { return `${ind}- ${key}: {\n${inner(getValue(value1), depth + 1)}\n${ind}  }\n${ind}+ ${key}: ${value2}`; }
      if (_.isObject(value2)) { return `${ind}- ${key}: ${value1}\n${ind}+ ${key}: {\n${inner(getValue(value2), depth + 1)}\n${indent}  }`; }
      return `${ind}- ${key}: ${value1}\n${ind}+ ${key}: ${value2}`;
    };

    const result = diffTree.map((obj) => {
      const { type } = obj;
      switch (type) {
        case 'added': return getDisplayValue(obj.value, indent, obj.key, '+');
        case 'deleted': return getDisplayValue(obj.value, indent, obj.key, '-');
        case 'compared':
          return `${indent}  ${obj.key}: {\n${inner(getValue(obj.value), depth + 1)}\n${indent}  }`;
        case 'changed': return getDisplayValueChanged(obj.key, obj.value1, obj.value2, indent);
        case 'unchanged': return `${indent}  ${obj.key}: ${obj.value}`;
        case 'added or deleted': return getDisplayValue(obj.value, indent, obj.key, ' ');
        default: return `an error occurred with the type '${type}'`;
      }
    });
    return result.join('\n');
  };
  return `{\n${inner(diff, 1)}\n}`;
};

export default stylish;
