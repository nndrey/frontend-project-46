import path from 'node:path';
import getParseData from './parsers.js';
import compare from './compare.js';
import getStyleFormat from '../formatters/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const currentDir = process.cwd();
  const getAbsolutePathFile = (pathFile) => path.resolve(currentDir, pathFile);
  const pathFile1 = getAbsolutePathFile(filepath1);
  const pathFile2 = getAbsolutePathFile(filepath2);
  const file1 = getParseData(pathFile1);
  const file2 = getParseData(pathFile2);
  const compareTree = compare(file1, file2);
  const style = getStyleFormat(formatName);
  switch (style) {
    case 'stylish':
      return stylish(compareTree);
    case 'plain':
      return plain(compareTree);
    case 'json': {
      const jsonFormat = plain(compareTree);
      return JSON.stringify(jsonFormat);
    }
    default:
      return stylish(compareTree);
  }
};

export default genDiff;
