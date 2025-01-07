import fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'node:path';

const getParseData = (dataPath) => {
  let parse = null;
  const format = path.extname(dataPath);
  const data = fs.readFileSync(dataPath, 'utf8');
  if (format === '.yml' || format === '.yaml') {
    parse = yaml.load(data);
  } if (format === '.json') {
    parse = JSON.parse(data);
  }
  if (format === '.ini') {
    parse = data;
  }
  return parse;
};

export default getParseData;
