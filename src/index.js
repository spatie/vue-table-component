import TableComponent from './components/TableComponent.vue';
import TableColumn from './components/TableColumn.vue';

export default {
    install(Vue) {
        Vue.component('table-component', TableComponent);
        Vue.component('table-column', TableColumn);
    },
};

export { TableComponent, TableColumn };
