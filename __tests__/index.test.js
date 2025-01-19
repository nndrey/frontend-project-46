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
const file1JsonPath = getFixturePath('file1.json');
const file1YamlPath = getFixturePath('file1.yaml');
const file2YamlPath = getFixturePath('file2.yaml');
const file2JsonPath = getFixturePath('file2.json');

const stylishBigFile = readFile(getFixturePath('stylishBigFile.ini'));
const plainBigFile = readFile(getFixturePath('plainBigFile.ini'));
const jsonBigFile = readFile(getFixturePath('jsonBigFile.ini'));

const stylishLittleFile = readFile(getFixturePath('stylishLittleFile.ini'));
const plainLittleFile = readFile(getFixturePath('plainLittleFile.ini'));
const jsonLittleFile = readFile(getFixturePath('jsonLittleFile.ini'));

test.each([
  [file3YamlPath, file4YamlPath, stylishBigFile],
  [file5JsonPath, file6JsonPath, stylishBigFile],
  [file3YamlPath, file6JsonPath, stylishBigFile],
  [file1JsonPath, file2JsonPath, stylishLittleFile],
  [file1YamlPath, file2YamlPath, stylishLittleFile],
  [file1JsonPath, file2YamlPath, stylishLittleFile],
])('format stylish', (a, b, expected) => {
  expect(genDiff(a, b, 'stylish')).toBe(expected);
}, 1000);

test.each([
  [file3YamlPath, file4YamlPath, plainBigFile],
  [file5JsonPath, file6JsonPath, plainBigFile],
  [file3YamlPath, file6JsonPath, plainBigFile],
  [file1JsonPath, file2JsonPath, plainLittleFile],
  [file1YamlPath, file2YamlPath, plainLittleFile],
  [file1JsonPath, file2YamlPath, plainLittleFile],
])('format plain', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
}, 1000);

test.each([
  [file3YamlPath, file4YamlPath, jsonBigFile],
  [file5JsonPath, file6JsonPath, jsonBigFile],
  [file3YamlPath, file6JsonPath, jsonBigFile],
  [file1JsonPath, file2JsonPath, jsonLittleFile],
  [file1YamlPath, file2YamlPath, jsonLittleFile],
  [file1JsonPath, file2YamlPath, jsonLittleFile],
])('format json', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
}, 1000);
