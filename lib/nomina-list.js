const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');

const nominaList = () => {
  return fs.readdirSync(dataDir).map((file) => {
    return file.replace('.json', '');
  });
};

module.exports = nominaList;
