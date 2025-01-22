import _ from 'lodash';

const stylish = (diff) => {
  const inner = (diffTree, depth) => {
    const getIndentWhithChar = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount - 2);
    const getIndentWithoutCharacters = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount);
    const indent = getIndentWhithChar(depth);
    const indentEnd = getIndentWithoutCharacters(depth);

    const getValue = (value, outerDepth) => {
      const indentСlosing = getIndentWithoutCharacters(outerDepth);
      const innerFunc = (curVal, innerDepth) => {
        const indentOpener = getIndentWithoutCharacters(innerDepth);
        if (!_.isPlainObject(curVal)) return curVal;
        const lines = Object
          .entries(curVal)
          .map(([key, val]) => `${indentOpener}${key}: ${getValue(val, outerDepth + 1)}`);

        return `{\n${lines.join('\n')}\n${indentСlosing}}`;
      };
      return innerFunc(value, outerDepth + 1);
    };

    const getDisplayValueChanged = (key, value1, value2, ind) => {
      if (_.isObject(value1)) { return `${ind}- ${key}: ${getValue(value1, depth)}\n${ind}+ ${key}: ${value2}`; }
      if (_.isObject(value2)) { return `${ind}- ${key}: ${value1}\n${ind}+ ${key}: ${getValue(value2, depth)}\n${indentEnd}}`; }
      return `${ind}- ${key}: ${value1}\n${ind}+ ${key}: ${value2}`;
    };

    const result = diffTree.map((obj) => {
      const { type } = obj;
      switch (type) {
        case 'added': return `${indent}+ ${obj.key}: ${getValue(obj.value, depth)}`;
        case 'deleted': return `${indent}- ${obj.key}: ${getValue(obj.value, depth)}`;
        case 'compared':
          return `${indent}  ${obj.key}: {\n${inner(obj.value, depth + 1)}\n${indentEnd}}`;
        case 'changed': return getDisplayValueChanged(obj.key, obj.value1, obj.value2, indent);
        case 'unchanged': return `${indent}  ${obj.key}: ${obj.value}`;
        default: throw new Error(`an error occurred with the type '${type}'`);
      }
    });
    return result.join('\n');
  };
  return `{\n${inner(diff, 1)}\n}`;
};

export default stylish;
