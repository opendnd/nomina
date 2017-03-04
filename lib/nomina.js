'use strict';

const path = require('path');
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const libDir = path.join(rootDir, 'lib');
const NameGenerator = require(path.join(libDir, 'generator'));

const nomina = (options = {}) => {
  const type = options.type || 'asian';
  const gender = options.gender || 'male';
  const set = require(path.join(dataDir, `${type}.json`));
  const nameSet = { default: set[gender] };
  const generator = new NameGenerator();
  generator.nameSet = nameSet;

  return generator.generateName('default');
};

module.exports = nomina;
