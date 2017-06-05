**WORK IN PROGRESS: DO NOT USE YET**

# A straightforward component to filter and sort tables

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-table-component.svg?style=flat-square)](https://npmjs.com/package/vue-table-component)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/vue-table-component/master.svg?style=flat-square)](https://travis-ci.org/spatie/vue-table-component)

Example html:

```html
<table-view
    :data="[{ id: 1, firstName: 'Jay', lastName: 'Vleugels' },
            { id: 2, firstName: 'Wesley', lastName: 'Biets' },
            { id: 3, firstName: 'Randy', lastName: 'Paret' },
            { id: 4, firstName: 'Devon', lastName: 'Macharis' }]"
    sort-by="lastName"
    sort-order="desc"
>
    <table-column for="firstName" label="First name"></table-column>
    <table-column for="lastName" label="Last name"></table-column>
</table-view>
```

## Demo

Add a link to a site where the component is being demonstrated live.

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

All postcards are published [on our website](https://spatie.be/opensource/postcards).

## Installation

You can install the package via yarn:

```bash
yarn add vue-table-component
```

or npm:

```bash
npm install vue-table-component --save
```

## Usage

Add instruction on how the package can be used

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

```bash
yarn test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact freek@spatie.be instead of using the issue tracker.

## Credits

- [Freek Van der Herten](https://github.com/freekmurze)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
