/* eslint-disable */
import * as fs from "fs";
import * as path from "path";

import {
  ICulture, ILinkCulture, NameTypes, SRD,
} from "@opendnd/core";

const {
  cultures,
  culturesDict,
} = SRD;

export interface INominaDefaults {
  cultures: {
    [uuid: string]: ILinkCulture,
  };

  cultureOptions?: string[];

  culturesDict: {
    [uuid: string]: ICulture,
  };

  typeOptions?: string[];
  genderOptions?: string[];
}

const rootDir = path.join(__dirname, "..");
const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, ".dnd", "nomina", "defaults.js");
let defaults: INominaDefaults;

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  defaults = {
    cultures,
    culturesDict,
  };
}

defaults.cultureOptions = Object.values(cultures).map((culture) => {
  return culture.name;
});

defaults.typeOptions = Object.keys(NameTypes);

export default defaults;
