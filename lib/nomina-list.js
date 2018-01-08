const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));

const nominaList = () => {
  return Object.keys(defaults.themes);
};

module.exports = nominaList;
