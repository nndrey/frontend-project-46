import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';
import { readFile } from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file3YamlPath = getFixturePath('file3.yaml');
const file4YamlPath = getFixturePath('file4.yaml');
const file5JsonPath = getFixturePath('file5.json');
const file6JsonPath = getFixturePath('file6.json');

const stylishBigFile = readFile(getFixturePath('stylishBigFile.ini'));
const plainBigFile = readFile(getFixturePath('plainBigFile.ini'));
const jsonBigFile = readFile(getFixturePath('jsonBigFile.ini'));

test.each([
  [file3YamlPath, file4YamlPath, stylishBigFile],
  [file5JsonPath, file6JsonPath, stylishBigFile],
  [file3YamlPath, file6JsonPath, stylishBigFile],
])('format stylish', (a, b, expected) => {
  expect(genDiff(a, b, { format: 'stylish' })).toBe(expected);
}, 1000);

test.each([
  [file3YamlPath, file4YamlPath, plainBigFile],
  [file5JsonPath, file6JsonPath, plainBigFile],
  [file3YamlPath, file6JsonPath, plainBigFile],
])('format plain', (a, b, expected) => {
  expect(genDiff(a, b, { format: 'plain' })).toBe(expected);
}, 1000);

test.each([
  [file3YamlPath, file4YamlPath, jsonBigFile],
  [file5JsonPath, file6JsonPath, jsonBigFile],
  [file3YamlPath, file6JsonPath, jsonBigFile],
])('format json', (a, b, expected) => {
  expect(genDiff(a, b, { format: 'json' })).toBe(expected);
}, 1000);
