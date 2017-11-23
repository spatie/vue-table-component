import Vue from 'vue/dist/vue.js';
import TableComponent from '../src';
import LocalStorageMock from './mocks/LocalStorageMock';

/*
 * Set up a localStorage mock implementation, and bind it to the window. Don't
 * forget to clear the storage before every one, since this is only executed
 * once per test run.
 */

const localStorage = new LocalStorageMock();

window.localStorage = localStorage;

/*
 * We'll globally install the table component as a Vue plugin so we don't need
 * to worry about importing the components for every test.
 */

Vue.use(TableComponent);

Vue.config.productionTip = false;
