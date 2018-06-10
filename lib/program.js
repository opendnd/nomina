const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Nomina = require(path.join(libDir, 'nomina'));
const nomina = new Nomina();

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-g, --type <type>', 'specify which type to generate')
  .option('-t, --theme <theme>', 'specify which theme to generate')
  .option('-n, --number <number>', 'specify how many names to generate')
  .command('generate', 'generate a name', { isDefault: true })
  .command('list', 'list the available themes')
  .alias('ls')
  .parse(process.argv);

// config
if (program.args.indexOf('list') < 0) {
  const opts = {};

  // type option
  if (program.type) {
    const typeValue = program.type.toLowerCase();
    const shortNames = ['m', 'f', 'd'];
    const types = ['male', 'female', 'dominia'];
    let type = 'male';

    // check if it is abbreviated
    if (shortNames.indexOf(typeValue) >= 0) {
      type = types[shortNames.indexOf(typeValue)];
    }

    // check if it is in the list
    if (types.indexOf(typeValue) >= 0) {
      type = typeValue;
    }

    opts.type = type;
  }

  // theme option
  if (program.theme) {
    const themeValue = program.theme.toLowerCase();
    opts.theme = themeValue;
  }

  // number option
  if (program.number) {
    const numberValue = parseInt(program.number, 10);
    opts.number = numberValue;
  }

  const result = nomina.generate(opts);

  if (Array.isArray(result)) {
    result.forEach((name) => {
      process.stdout.write(`${name}\n`);
    });
  } else {
    process.stdout.write(`${result}\n`);
  }
}
