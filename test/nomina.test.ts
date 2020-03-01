import {  NameTypes } from "@opendnd/core";
import { expect } from "chai";
import defaults, { INominaDefaults } from "../src/defaults";
import Nomina from "../src/nomina";

let nomina;

describe("Nomina", () => {
  describe("module", () => {
    before(() => {
      nomina = new Nomina();
    });

    it("outputs a name", () => {
      const options = {
        culture: Object.values(defaults.cultures)[0],
        type: NameTypes.Female,
      };

      const result = nomina.generate(options);
      expect(result.length).to.be.above(1);
    });
  });

  describe("pass defaults", () => {
    before(() => {
      const defaults: INominaDefaults = {
        cultures: {
          test: {
            uuid: "test",
            name: "Test",
          },
        },
        culturesDict: {
          test: {
            uuid: "test",
            name: "Test",
            version: "1",
            description: "test desc",
            abstract: false,
            names: {
              male: ["foo"],
              female: ["bar"],
              domain: ["baz"],
            },
          },
        },
        cultureOptions: ["Test"],
        typeOptions: Object.keys(NameTypes),
      };

      nomina = new Nomina({
        defaults,
      });
    });

    it("outputs custom themes", () => {
      const result = nomina.getThemes();
      expect(result.length).to.eq(1);
      expect(result).to.include("Test");
    });
  });
});
