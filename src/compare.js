import _ from 'lodash';

const compare = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortKey = _.sortBy(uniqueKeys);
  const result = sortKey.map((key) => {
    switch (true) {
      case !Object.hasOwn(content1, key):
        return { key, type: 'added', value: content2[key] };
      case !Object.hasOwn(content2, key):
        return { key, type: 'deleted', value: content1[key] };
      case _.isPlainObject(content1[key]) && _.isPlainObject(content2[key]):
        return { key, type: 'nested', value: compare(content1[key], content2[key]) };
      case !_.isEqual(content1[key], content2[key]):
        return {
          key, type: 'changed', value1: content1[key], value2: content2[key],
        };
      case _.isEqual(content1[key], content2[key]):
        return { key, type: 'unchanged', value: content1[key] };
      default:
        throw new Error(`Validation for key: ${key}!`);
    }
  });
  return result;
};

export default compare;
