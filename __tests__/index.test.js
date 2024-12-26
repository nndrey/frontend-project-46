import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import compare from '../src/compare.js';
import getParseData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compareJson', () => {
  const file1 = getParseData(getFixturePath('file1.json'));
  const file2 = getParseData(getFixturePath('file2.json'));
  expect(compare(file1, file2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('compareJson', () => {
  const file1 = getParseData(getFixturePath('file3.json'));
  const file2 = getParseData(getFixturePath('file4.json'));
  expect(compare(file1, file2)).toEqual(`{
  - age: 150
  - country: Russia
  + country: USA
    courses: different
  + credit: true
  - follow: true
  + follow: false
  - name: hexlet
  + name: rocklet
  - program: good
  + program: bad
    square: 154655255555266
  - teachers: true
  + teachers: false
}`);
});

test('compareYaml', () => {
  const file1 = getParseData(getFixturePath('file1.yaml'));
  const file2 = getParseData(getFixturePath('file2.yaml'));
  expect(compare(file1, file2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
