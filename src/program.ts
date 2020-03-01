import * as path from "path";
import defaults from "./defaults";
import Nomina, { INominaOpts } from "./nomina";

const program = require("commander");
const rootDir = path.join(__dirname, "..");
const pinfo = require(path.join(rootDir, "package.json"));
const nomina = new Nomina();

const {
  cultures,
  cultureOptions,
  typeOptions,
} = defaults;

// program basics
program
  .version(pinfo.version, "-v, --version")
  .description(pinfo.description)
  .option("-g, --type <type>", "specify which type to generate")
  .option("-c, --culture <culture>", "specify which culture to generate")
  .option("-n, --number <number>", "specify how many names to generate")
  .command("generate", "generate a name", { isDefault: true })
  .command("list", "list the available cultures")
  .alias("ls")
  .parse(process.argv);

// config
if (program.args.indexOf("list") < 0) {
  const opts: INominaOpts = {};

  // type option
  if (program.type) {
    if (typeOptions.includes(program.type)) {
      opts.type = program.type;
    }
  }

  // culture culture
  if (program.culture) {
    if (cultureOptions.includes(program.culture)) {
      Object.values(cultures).forEach((culture) => {
        if (culture.name === program.culture) { opts.culture = culture; }
      });
    }
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
