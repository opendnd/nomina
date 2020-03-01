import { ICulture, ILinkCulture, NameTypes } from "@opendnd/core";
import defaults, { INominaDefaults } from "./defaults";
import "./extensions";

const path = require("path");
const rootDir = path.join(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const Generator = require(path.join(srcDir, "generator"));

export interface INominaOpts {
  defaults?: INominaDefaults;
  number?: number;
  culture?: ILinkCulture;
  type?: NameTypes;
}

// create nomina
class Nomina {
  public defaults: INominaDefaults;

  // init
  constructor(opts: INominaOpts = {}) {
    this.defaults = opts.defaults || defaults;
  }

  // list themes
  public getThemes() {
    return this.defaults.cultureOptions;
  }

  // generate
  public generate(opts: INominaOpts = {}) {
    const amount = opts.number || 1;
    const linkCulture = opts.culture || Object.values(this.defaults.cultures).sample();
    const type = opts.type || this.defaults.typeOptions.sample();
    const culture: ICulture = this.defaults.culturesDict[linkCulture.uuid];
    const set = culture.names[type.toLowerCase()];
    const nameSet = { default: set };
    const generator = new Generator();
    generator.nameSet = nameSet;

    // generate a list
    if (amount > 1) {
      return generator.nameList("default", amount);
    }

    return generator.generateName("default");
  }
}

export default Nomina;
