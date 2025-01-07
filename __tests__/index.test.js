import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import getParseData from '../src/parsers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yaml');
  const fileStylish = getParseData(getFixturePath('stylish.ini'));
  expect(genDiff(file1Path, file2Path, { format: 'stylish' })).toEqual(fileStylish);
});

test('plain', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yaml');
  const filePlain = getParseData(getFixturePath('plain.ini'));
  expect(genDiff(file1Path, file2Path, { format: 'plain' })).toEqual(filePlain);
});

test('plain', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yaml');
  const fileJson = getParseData(getFixturePath('jsonFormat.ini'));
  expect(genDiff(file1Path, file2Path, { format: 'json' })).toEqual(fileJson);
});
