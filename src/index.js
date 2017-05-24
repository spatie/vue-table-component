import TableView from './components/TableView.vue';
import TableColumn from './components/TableColumn.vue';

export default {
    install(Vue) {
        Vue.component('table-view', TableView);
        Vue.component('table-column', TableColumn);
    },
};

export { TableView, TableColumn };

