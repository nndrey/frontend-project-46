import path from 'node:path';
import getParseData from './parsers.js';
import compare from './compare.js';

const gendiff = (filepath1, filepath2) => {
  const currentDir = process.cwd();
  const getAbsolutePathFile = (pathFile) => path.resolve(currentDir, pathFile);
  const pathFile1 = getAbsolutePathFile(filepath1);
  const pathFile2 = getAbsolutePathFile(filepath2);
  const file1 = getParseData(pathFile1);
  const file2 = getParseData(pathFile2);

  return compare(file1, file2);
};

export default gendiff;
