const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));
const NameGenerator = require(path.join(libDir, 'generator'));
const nominaList = require(path.join(libDir, 'nomina-list'));

// grab a random element
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// get themes
const themes = nominaList();

// create nomina
const nomina = (options = {}) => {
  const number = options.number || 1;
  const theme = options.theme || themes.sample();
  const type = options.type || ['female', 'male', 'dominia'].sample();
  const set = defaults.themes[theme][type];
  const nameSet = { default: set };
  const generator = new NameGenerator();
  generator.nameSet = nameSet;

  if (number > 1) {
    return generator.nameList('default', number);
  }

  return generator.generateName('default');
};

module.exports = nomina;
