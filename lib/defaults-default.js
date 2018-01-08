const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const dataDir = path.join(libDir, 'data');

// load data
const asian = require(path.join(dataDir, 'asian.json'));
const classical = require(path.join(dataDir, 'classical.json'));
const medieval = require(path.join(dataDir, 'medieval.json'));

const defaults = {
  themes: {
    asian,
    classical,
    medieval,
  },
};

module.exports = defaults;
