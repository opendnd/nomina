import Nomina from "./nomina";
const nomina = new Nomina();

process.stdout.write("Here are the available types:\n");

nomina.getThemes().forEach((name) => {
  process.stdout.write(`  - ${name}\n`);
});
