import TableComponent from './components/TableComponent';
import TableColumn from './components/TableColumn';
import { mergeSettings } from './settings';

export default {
    install(Vue) {
        Vue.component('table-component', TableComponent);
        Vue.component('table-column', TableColumn);
    },

    settings(settings) {
        mergeSettings(settings);
    },
};

export { TableComponent, TableColumn };
