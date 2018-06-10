const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const binDir = path.join(rootDir, 'bin');
const spawn = require('child_process').spawn;
const Nomina = require(path.join(libDir, 'nomina'));
let program;
let nomina;
let output = '';

describe('Nomina', () => {
  describe('bin', () => {
    before((done) => {
      const options = [
        '--theme', 'medieval', 
        '--type', 'female'
      ];
      program = spawn(path.join(binDir, 'nomina'), options);

      program.stdout.on('data', (data) => {
        output += data;
      });

      program.on('close', () => {
        done();
      });
    });

    it('outputs something', () => {
      expect(output.length).to.be.above(1);
    });
  });

  describe('module', () => {
    before(() => {
      nomina = new Nomina();
    });

    it('outputs a name', () => {
      const options = {
        theme: 'medieval',
        type: 'female'
      };

      const result = nomina.generate(options);
      expect(result.length).to.be.above(1);
    });
  });

  describe('pass defaults', () => {
    before(() => {
      const defaults = {
        themes: {
          test: {
            male: ['foo'],
            female: ['bar'],
            dominia: ['baz'],
          },
        },
      };

      nomina = new Nomina({
        defaults,
      });
    });

    it('outputs custom themes', () => {
      const result = nomina.getThemes();
      expect(result.length).to.eq(1);
      expect(result).to.include('test');
    });
  });
});