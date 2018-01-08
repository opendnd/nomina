const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const binDir = path.join(rootDir, 'bin');
const spawn = require('child_process').spawn;
let nomina;
let output = '';

describe('nomina', () => {
  describe('bin', () => {
    before((done) => {
      const options = [
        '--theme', 'medieval', 
        '--type', 'female'
      ];
      nomina = spawn(path.join(binDir, 'nomina'), options);

      nomina.stdout.on('data', (data) => {
        output += data;
      });

      nomina.on('close', () => {
        done();
      });
    });

    it('outputs something', () => {
      expect(output.length).to.be.above(1);
    });
  });

  describe('module', () => {
    before(() => {
      nomina = require(path.join(libDir, 'nomina'));
    });

    it('outputs a name', () => {
      const options = {
        theme: 'medieval',
        type: 'female'
      };

      const result = nomina(options);
      expect(result.length).to.be.above(1);
    });
  });
});