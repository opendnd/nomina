const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Nomina = require(path.join(libDir, 'nomina'));
const nomina = new Nomina();

process.stdout.write('Here are the available types:\n');

nomina.getThemes().forEach((name) => {
  process.stdout.write(`  - ${name}\n`);
});
