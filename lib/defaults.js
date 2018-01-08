const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, '.dnd', 'nomina', 'defaults.js');
let defaults;

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  defaults = require(path.join(libDir, 'defaults-default'));
}

module.exports = defaults;
