const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));
const Generator = require(path.join(libDir, 'generator'));

// create nomina
class Nomina {
  // init
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
  }

  // list themes
  getThemes() {
    return Object.keys(this.defaults.themes);
  }

  // generate
  generate(opts = {}) {
    const themes = this.getThemes();
    const number = opts.number || 1;
    const theme = opts.theme || themes.sample();
    const type = opts.type || ['female', 'male', 'dominia'].sample();
    const set = this.defaults.themes[theme][type];
    const nameSet = { default: set };
    const generator = new Generator();
    generator.nameSet = nameSet;

    // generate a list
    if (number > 1) {
      return generator.nameList('default', number);
    }

    return generator.generateName('default');
  }
}

module.exports = Nomina;
