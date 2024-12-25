import _ from 'lodash';

const compare = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortKey = _.sortBy(uniqueKeys);
  const result = sortKey.map((key) => {
    if (!Object.hasOwn(file1, key)) return `  + ${key}: ${file2[key]}`;
    if (!Object.hasOwn(file2, key)) return `  - ${key}: ${file1[key]}`;
    if (file1[key] !== file2[key]) return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    return `    ${key}: ${file1[key]}`;
  }).join('\n');
  return `{\n${result}\n}`;
};

export default compare;
