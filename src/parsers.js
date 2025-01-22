import * as yaml from 'js-yaml';

const getParseData = (data, format) => {
  if (format === 'yml' || format === 'yaml') return yaml.load(data);
  if (format === 'json') return JSON.parse(data);
  throw new Error(`Unknown format status: '${format}'!`);
};

export default getParseData;
