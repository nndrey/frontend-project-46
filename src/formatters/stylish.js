import _ from 'lodash';

const getValueString = (value, funcMargins, outerDepth) => {
  const indentСlosing = funcMargins(outerDepth);
  const innerFunc = (curVal, innerDepth) => {
    const indentOpener = funcMargins(innerDepth);
    if (!_.isPlainObject(curVal)) return curVal;
    const lines = Object
      .entries(curVal)
      .map(([key, val]) => `${indentOpener}${key}: ${getValueString(val, funcMargins, outerDepth + 1)}`);

    return `{\n${lines.join('\n')}\n${indentСlosing}}`;
  };
  return innerFunc(value, outerDepth + 1);
};

const stylish = (diff) => {
  const inner = (diffTree, depth) => {
    const getIndentWhithChar = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount - 2);
    const getIndentWithoutCharacters = (dep, spacesCount = 4) => ' '.repeat(dep * spacesCount);
    const indent = getIndentWhithChar(depth);
    const indentEnd = getIndentWithoutCharacters(depth);

    const result = diffTree.map((obj) => {
      const { type } = obj;
      switch (type) {
        case 'added': return `${indent}+ ${obj.key}: ${getValueString(obj.value, getIndentWithoutCharacters, depth)}`;
        case 'deleted': return `${indent}- ${obj.key}: ${getValueString(obj.value, getIndentWithoutCharacters, depth)}`;
        case 'nested':
          return `${indent}  ${obj.key}: {\n${inner(obj.value, depth + 1)}\n${indentEnd}}`;
        case 'changed':
          return `${indent}- ${obj.key}: ${getValueString(obj.value1, getIndentWithoutCharacters, depth)}\n${indent}+ ${obj.key}: ${getValueString(obj.value2, getIndentWithoutCharacters, depth)}`;
        case 'unchanged': return `${indent}  ${obj.key}: ${obj.value}`;
        default: throw new Error(`an error occurred with the type '${type}'`);
      }
    });
    return result.join('\n');
  };
  return `{\n${inner(diff, 1)}\n}`;
};

export default stylish;
