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

### Theme

`nomina --theme medieval`

To see the available name types you can do `nomina list`

### Gender

`nomina --type female`

You can specify a gender by setting either `male` or `female` (or for convenience `m` / `f`) or you can specify a city/town name by passing `dominia`.

## Module Usage

```javascript
const Nomina = require('nomina');
const nomina = new Nomina();

// specify options, none are required
const options = {
  theme: 'medieval',
  type: 'female',
};

// call the method
const result = nomina.generate(options);

// get all themes available
const themes = nomina.getThemes();
```

## Custom Configs
There are a couple of ways you can configure the themes that the tool uses:

### CLI Config
The CLI checks for `~/.dnd/nomina/defaults.js` before loading any other configuration. Simply add a file here while using the tool and you can customize the themes.

### Class Config
You can pass a "defaults" config directly to the class on initialization:

```javascript
const Nomina = require('nomina');
const defaults = {
  themes: {
    myCustomTheme: {
      male: [],
      female: [],
      dominia: [],
    },
    myOtherCustomTheme: {
      male: [],
      female: [],
      dominia: [],
    },
  },
};

const nomina = new Nomina({ defaults });
const themes = nomina.getThemes(); // ['myCustomTheme', 'myOtherCustomTheme']
```

## Developing

To develop nomina,

```shell
git clone https://github.com/opendnd/nomina.git
cd nomina/
npm install
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are welcome!

Nomina use the [Airbnb](https://github.com/airbnb/javascript) javascript style.

## Licensing

[MIT](https://github.com/opendnd/nomina/blob/master/LICENSE)