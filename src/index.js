import path from 'node:path';
import getParseData from './parsers.js';
import compare from './compare.js';
import getStyleFormat from './formatters/index.js';

const currentDir = process.cwd();
const getAbsolutePathFile = (pathFile) => path.resolve(currentDir, pathFile);

const genDiff = (filepath1, filepath2, formatName) => {
  const pathFile1 = getAbsolutePathFile(filepath1);
  const pathFile2 = getAbsolutePathFile(filepath2);
  const file1 = getParseData(pathFile1);
  const file2 = getParseData(pathFile2);
  const compareTree = compare(file1, file2);
  const funcFormater = getStyleFormat(formatName);
  return funcFormater(compareTree);
};

export default genDiff;
