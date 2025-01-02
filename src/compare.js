import _ from 'lodash';

const compare = (file1, file2) => {
  const getUniqueObject = (obj) => {
    const result = Object
      .entries(obj)
      .map(([key, value]) => {
        if (!_.isObject(value)) return ({ key, type: 'unique', value });
        return { key, type: 'unique', value: getUniqueObject(value) };
      });
    return result;
  };
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortKey = _.sortBy(uniqueKeys);
  const result = sortKey.map((key) => {
    if (!Object.hasOwn(file1, key) && !_.isObject(file2[key])) {
      return {
        key, type: 'added', value: file2[key],
      };
    }
    if (!Object.hasOwn(file1, key)) return { key, type: 'added', value: getUniqueObject(file2[key]) };
    if (!Object.hasOwn(file2, key) && !_.isObject(file1[key])) {
      return {
        key, type: 'deleted', value: file1[key],
      };
    }
    if (!Object.hasOwn(file2, key)) return { key, type: 'deleted', value: getUniqueObject(file1[key]) };
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key, type: 'changed', feature: 'compared', value: compare(file1[key], file2[key]),
      };
    }
    if (file1[key] !== file2[key] && !_.isObject(file1[key]) && !_.isObject(file2[key])) {
      return {
        key, type: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    if (_.isObject(file1[key])) {
      return {
        key, type: 'changed', feature: 'firstObject', value1: getUniqueObject(file1[key]), value2: file2[key],
      };
    }
    if (_.isObject(file2[key])) {
      return {
        key, type: 'changed', feature: 'secondObject', value1: file1[key], value2: getUniqueObject(file2[key]),
      };
    }
    return { key, type: 'unchanged', value: file1[key] };
  });
  return result;
};

export default compare;
