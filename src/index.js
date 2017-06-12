import TableComponent from './components/TableComponent.vue';
import TableColumn from './components/TableColumn.vue';
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
