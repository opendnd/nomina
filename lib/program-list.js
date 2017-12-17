const nominaList = require('./nomina-list');
const list = nominaList();

process.stdout.write('Here are the available types:\n');

list.forEach(name => {
  process.stdout.write(`  - ${name}\n`);
});