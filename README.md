# A straightforward Vue component to filter and sort tables

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-table-component.svg?style=flat-square)](https://npmjs.com/package/vue-table-component)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/vue-table-component/master.svg?style=flat-square)](https://travis-ci.org/spatie/vue-table-component)
[![npm](https://img.shields.io/npm/dt/vue-table-component.svg?style=flat-square)](https://www.npmjs.com/package/vue-table-component)

This repo contains a Vue component that can render a filterable and sortable table. It aims to be very lightweight and easy to use. It has support for [retrieving data asynchounously and pagination](#retrieving-data-asynchronously).

Here's an example of how you can use it:

```html
<table-component
     :data="[
          { firstName: 'John', lastName: 'Lennon', instrument: 'Guitar', editUrl: '<a href='#john'>Edit</a>', birthday: '04/10/1940', songs: 72 },
          { firstName: 'Paul', lastName: 'McCartney', instrument: 'Bass', editUrl: '<a href='#paul'>Edit</a>', birthday: '18/06/1942', songs: 70 },
          { firstName: 'George', lastName: 'Harrison', instrument: 'Guitar', editUrl: '<a href='#george'>Edit</a>', birthday: '25/02/1943', songs: 22 },
          { firstName: 'Ringo', lastName: 'Starr', instrument: 'Drums', editUrl: '<a href='#ringo'>Edit</a>', birthday: '07/07/1940', songs: 2 },
     ]"
     sort-by="songs"
     sort-order="asc"
>
     <table-column show="firstName" label="First name"></table-column>
     <table-column show="lastName" label="Last name"></table-column>
     <table-column show="instrument" label="Instrument"></table-column>
     <table-column show="songs" label="Songs" data-type="numeric"></table-column>
     <table-column show="birthday" label="Birthday" data-type="date:DD/MM/YYYY"></table-column>
     <table-column show="editUrl" label="" :sortable="false" :filterable="false"></table-column>
 </table-component>
```

A cool feature is that the table caches the used filter and sorting for 15 minutes. So if you refresh the page, the filter and sorting will still be used.

You can see this code in action on [the demo page](http://vue-table-component.spatie.be).

## Demo

Want to see the component in action? No problem. [Here's a demo](http://vue-table-component.spatie.be).

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

Next you must register the component. The most common use case is to do that globally.

```js
//in your app.js or similar file
import Vue from 'vue';
import { TableComponent, TableColumn } from 'vue-table-component';

Vue.component('table-component', TableComponent);
Vue.component('table-column', TableColumn);
```

Alternatively you can do this to register the components:

```js
import TableComponent from 'vue-table-component';

Vue.use(TableComponent);
```

## Usage

Here's a simple example on how to use the component.

```html
<table-component
     :data="[
     { firstName: 'John', birthday: '04/10/1940', songs: 72 },
     { firstName: 'Paul', birthday: '18/06/1942', songs: 70 },
     { firstName: 'George', birthday: '25/02/1943', songs: 22 },
     { firstName: 'Ringo', birthday: '07/07/1940', songs: 2 },
     ]"
     sort-by="songs"
     sort-order="asc"
     >
     <table-column show="firstName" label="First name"></table-column>
     <table-column show="songs" label="Songs" data-type="numeric"></table-column>
     <table-column show="birthday" label="Birthday" :filterable="false" data-type="date:DD/MM/YYYY"></table-column>
 </table-component>
```

This wil render a table that is both filterable and sortable. A filter field will be displayed right above the table. If your data contains any html we will filter that out when filtering. You can sort the table by clicking on the column headers. By default it will remember the used filter and sorting for the next 15 minutes.

### Props

You can pass these props to `table-component`:
- `data`: (required) the data the component will operate on. This can either be an array or [a function](#retrieving-data-asynchronously)
- `show-filter`: set this to `false` to not display the `filter` field.
- `show-caption`: set this to `false` to not display the `caption` field which shows the current active filter.
- `sort-by`: the property in data on which to initially sort.
- `sort-order`: the initial sort order.
- `cache-lifetime`: the lifetime in minutes the component will cache the filter and sorting.
- `cache-id`: if you use multiple instances of `table-component` on the same page you must set this to a unique value per instance.
- `table-class`: the passed value will be added to the `class` attribute of the rendered table
- `filter-placeholder`: the text used as a placeholder in the filter field
- `filter-no-results`: the text displayed when the filtering returns no results

For each `table-column` a column will be rendered. It can have these props:
- `show`: (required) the property name in the data that needs to be shown in this column.
- `label`: the label that will be shown on top of the column. Set this to an empty string to display nothing. If this property is not present, the string passed to `show` will be used.
- `data-type`: if your column should be sorted numerically set this to `numeric`. If your column contains dates set it to `date:` followed by the format of your date
- `sortable`: if you set this to `false` then the column won't be sorted when clicking the column header
- `sort-by`: you can set this to any property present in `data`. When sorting the column that property will be used to sort on instead of the property in `show`.
- `filterable`: if this is set to `false` than this column won't be used when filtering
- `filter-on`: you can set this to any property present in `data`. When filtering the column that property will be used to filter on instead of the property in `show`.
- `hidden`: if you set this to `true` then the column will be hidden. This is useful when you want to sort by a field but don't want it to be visible.

### Modifying the used texts and classes

If you want to modify the built in text or classes you can pass settings globally

```js
import TableComponent from 'vue-table-component';

TableComponent.settings({
    tableClass: '',
    filterPlaceholder: 'Filter table…',
    filterNoResults: 'There are no matching rows',
});
```

## Retrieving data asynchronously

The component can fetch data in an asynchronous manner. The most common use case for this is fetching data from a server.

Do use the feature you should pass a function to the `data` prop. The function will receive an object with `filters`, `sort` and `page`. You can use this data to fetch the right data. The function should return an object with there properties:

- `data`: (required) the data that should be displayed in the table. 
- `pagination`: (optional) this should be an object with keys `current_page` and `total_pages`. When `total_pages` is higher than 1 pagination links will be displayed.

## Changelog

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
- [Sebastian De Deyne](https://github.com/sebdedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
