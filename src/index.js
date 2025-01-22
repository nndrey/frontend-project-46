import _ from 'lodash';
import path from 'node:path';
import getParseData from './parsers.js';
import compare from './compare.js';
import formate from './formatters/index.js';
import { readFile } from './helpers.js';

const getAbsolutePathFile = (pathFile) => path.resolve(process.cwd(), pathFile);
const getFormatFile = (pathFile) => path.extname(pathFile).slice(1);

const genDiff = (filepath1, filepath2, formatName) => {
  const getFormat = (format) => {
    if (_.isObject(format)) {
      const typeFormat = Object.values(format || {}).join();
      if (typeFormat !== 'plain' && typeFormat !== 'json') return 'stylish';
      return typeFormat;
    }
    if (format !== 'plain' && format !== 'json') return 'stylish';
    return format;
  };
  const format = getFormat(formatName);

  const pathFile1 = getAbsolutePathFile(filepath1);
  const pathFile2 = getAbsolutePathFile(filepath2);
  const readFile1 = readFile(pathFile1);
  const readFile2 = readFile(pathFile2);
  const formatFile1 = getFormatFile(pathFile1);
  const formatFile2 = getFormatFile(pathFile2);

  const fileContent1 = getParseData(readFile1, formatFile1);
  const fileContent2 = getParseData(readFile2, formatFile2);
  const compareTree = compare(fileContent1, fileContent2);
  return formate(compareTree, format);
};

export default genDiff;
