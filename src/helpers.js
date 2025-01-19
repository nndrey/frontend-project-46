import fs from 'fs';

const isString = (value) => typeof value === 'string';
const readFile = (dataPath) => fs.readFileSync(dataPath, 'utf8');

export { isString, readFile };
