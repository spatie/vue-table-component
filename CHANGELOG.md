# Changelog

All notable changes to `vue-table-component` will be documented in this file

## 1.4.0 - 2017-08-16
- Fixed cell rendering: HTML is now escaped by default. If you want raw html, use the new scoped slots feature
- Added scoped slot support to `table-columns` for custom column contents
- Added the `filter-input-class` prop to the `table-component` component (`filterInputClass` in settings)
- Added the `header-class` and `cell-class` props to the `table-column` component (`headerClass` and `cellClass` in settings)
- Added a minified build: `vue-table-component/dist/index.min.js`
- Fixed the parsing of the a date format that contains `:`

## 1.3.0 - 2017-08-07
- Added `formatter` property

## 1.2.2 - 2017-08-04
- Fix for displaying nested properties

## 1.2.1 - 2017-08-04
- Fix async data retrieval and pagination

## 1.2.0 - 2017-08-02
- Add async data retrieval and pagination

## 1.1.3 - 2017-06-29
- Fixed a filter bug caused by null values

## 1.1.2 - 2017-06-28
- Added optional `hidden` prop to table column component

## 1.1.1 - 2017-06-28
- Fixed `filterNoResults` label

## 1.1.0 - 2017-06-23
- Added `show-caption` prop

## 1.0.1- 2017-06-13
- Fix default sort order
- Fix ordering of numeric and date columns in Safari

## 1.0.0 - 2017-06-13
- Initial release
