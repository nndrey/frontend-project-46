import _ from 'lodash';

const compare = (content1, content2) => {
  const getValue = (val) => {
    if (!_.isPlainObject(val)) return val;
    const result = Object
      .entries(val)
      .map(([key, value]) => {
        if (_.isPlainObject(value)) return { key, value: getValue(value) };
        return ({ key, value });
      });
    return result;
  };
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortKey = _.sortBy(uniqueKeys);
  const result = sortKey.map((key) => {
    if (!Object.hasOwn(content1, key)) return { key, type: 'added', value: getValue(content2[key]) };
    if (!Object.hasOwn(content2, key)) return { key, type: 'deleted', value: getValue(content1[key]) };
    if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) return { key, type: 'compared', value: compare(content1[key], content2[key]) };
    if (!_.isEqual(content1[key], content2[key])) {
      return {
        key, type: 'changed', value1: getValue(content1[key]), value2: getValue(content2[key]),
      };
    }
    if (_.isEqual(content1[key], content2[key])) return { key, type: 'unchanged', value: getValue(content1[key]) };
    return null;
  });
  return result;
};

export default compare;
