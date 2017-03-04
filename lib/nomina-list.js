'use strict';

const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');

process.stdout.write('Here are the available types:\n');

fs.readdir(dataDir, (err, files) => {
  files.forEach((file) => {
    const name = file.replace('.json', '\n');
    process.stdout.write(`  - ${name}`);
  });
});
