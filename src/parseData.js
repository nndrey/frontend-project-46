import fs from 'fs';

const getParseData = (dataPath) => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};
export default getParseData;
