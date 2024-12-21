import path from 'node:path';
import getParseData from './parseData.js';

const currentDir = process.cwd();
const pathFixtures = path.resolve(currentDir, '..', '__fixtures__');

const gendiff = (filepath1, filepath2) => {
  const pathFile1 = path.resolve(pathFixtures, filepath1);
  const pathFile2 = path.resolve(pathFixtures, filepath2);

  const file1 = getParseData(pathFile1);
  const file2 = getParseData(pathFile2);

  console.log(file1);
  console.log(file2);
};

export default gendiff;
