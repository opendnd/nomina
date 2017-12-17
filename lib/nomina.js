const path = require('path');
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const libDir = path.join(rootDir, 'lib');
const NameGenerator = require(path.join(libDir, 'generator'));
const nominaList = require(path.join(libDir, 'nomina-list'));

// grab a random element
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// get types
const types = nominaList();

// create nomina
const nomina = (options = {}) => {
  const type = options.type || types.sample();
  const gender = options.gender || ['female', 'male'].sample();
  const set = require(path.join(dataDir, `${type}.json`));
  const nameSet = { default: set[gender] };
  const generator = new NameGenerator();
  generator.nameSet = nameSet;

  return generator.generateName('default');
};

module.exports = nomina;
