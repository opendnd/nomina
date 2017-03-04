# nomina

[![NPM](https://nodei.co/npm/nomina.png?downloads=true&stars=true)](https://nodei.co/npm/nomina/) 

[![Build Status](https://travis-ci.org/opendnd/nomina.svg?branch=master)](https://travis-ci.org/opendnd/nomina)

This is a tool for generating names for characters with a wide variety.

## Installation

You will need [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed. Then do:

`npm install -g nomina`

## Generate a name

Once you have installed nomina you can generate a name by simply running the following: 

`nomina`

## Options

### Type

`nomina --type medieval`

To see the available name types you can do `nomina list`

### Gender

`nomina --gender female`

You can specify a gender by setting either `male` or `female` (or for convenience `m` / `f`)

## Module Usage

```javascript
const nomina = require('nomina');

// specify options, none are required
const options = {
  type: 'medieval',
  gender: 'female'
};

// call the method
const result = nomina(options);
```

## License

[MIT](https://github.com/opendnd/nomina/blob/master/LICENSE)