const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const nomina = require(path.join(libDir, 'nomina'));

// program basics
program
.version(pinfo.version, '-v, --version')
.description(pinfo.description)
.option('-g, --gender <type>', 'specify which gender to generate')
.option('-t, --type <type>', 'specify which type to generate')
.command('generate', 'generate a name', { isDefault: true })
.command('list', 'list the available types')
.parse(process.argv);

// config
if (program.args.indexOf('list') < 0) {
  const options = {};

  // gender option
  if (program.gender) {
    const genderValue = program.gender.toLowerCase();
    const shortNames = ['m', 'f'];
    const genders = ['male', 'female'];
    let gender = 'male';

    // check if it is abbreviated
    if (shortNames.indexOf(genderValue) >= 0) {
      gender = genders[shortNames.indexOf(genderValue)];
    }

    // check if it is in the list
    if (genders.indexOf(genderValue) >= 0) {
      gender = genderValue;
    }

    options.gender = gender;
  }

  // type option
  if (program.type) {
    const typeValue = program.type.toLowerCase();
    options.type = typeValue;
  }

  const result = nomina(options);
  process.stdout.write(`${result}\n`);
}
