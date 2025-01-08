import fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'node:path';

const getParseData = (dataPath) => {
  const format = path.extname(dataPath);
  const data = fs.readFileSync(dataPath, 'utf8');
  if (format === '.yml' || format === '.yaml') return yaml.load(data);
  if (format === '.json') return JSON.parse(data);
  if (format === '.ini') return data;
  return null;
};

export default getParseData;
