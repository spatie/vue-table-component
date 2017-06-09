<template>
    <div class="table-component">

        <div v-if="showFilter" class="table-component__filter">
            <input class="table-component__filter__field" type="text" v-model="filter" name="table-component-filter"
                   placeholder="Filter table…">
            <a v-if="filter !== ''" @click="filter = ''" class="table-component__filter__clear">×</a>
        </div>

        <div class="table-component__table-wrapper">
            <table class="table-component__table">
                <thead>
                <tr>
                    <table-column-header
                            @click="changeSorting"
                            v-for="column in columns"
                            :key="column.properties.for"
                            :sort="sort"
                            :column="column"
                    />
                </tr>
                </thead>
                <tbody>
                <table-row v-for="row in displayedRows"
                           :key="row.id"
                           :row="row"
                           :columns="columns"
                />
                </tbody>
            </table>
        </div>

        <div v-if="displayedRows.length === 0" class="table-component__message">
            There are no matching rows
        </div>

        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Column from '../classes/Column';
    import expiringStorage from '../expiringStorage';
    import Row from '../classes/Row';
    import TableColumnHeader from './TableColumnHeader';
    import TableRow from './TableRow';
    import { pick } from 'lodash';

    export default {
        components: {
            TableColumnHeader,
            TableRow,
        },

        props: {
            data: { required: true, type: Array },

            showFilter: { default: true },
            sortBy: { default: '', type: String },
            sortOrder: { default: 'desc', type: String },

            cacheId: { default: '' },
            cacheLifetime: { default: 5 },
        },

        data: () => ({
            columns: [],
            rows: [],
            filter: '',
            sort: {
                fieldName: '',
                order: '',
            },
        }),

        computed: {
            displayedRows() {
                return this.sortedRows.filter(row => row.passesFilter(this.filter));
            },

            sortedRows() {
                if (this.sort.fieldName === '') {
                    return this.rows;
                }

                if (this.columns.length === 0) {
                    return this.rows;
                }

                const sortColumn = this.getColumn(this.sort.fieldName);

                if (! sortColumn) {
                    return this.rows;
                }

                return this.rows.sort(sortColumn.getSortPredicate(this.sort.order));
            },

            storageKey() {
                return `vue-table-component.${window.location.host}${window.location.pathname}${this.cacheId}`;
            },
        },

        watch: {
            filter() {
                this.saveState();
            }
        },

        mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, [
                    'for', 'label', 'sortable', 'filterable', 'dataType',
                ]))
                .map(columnProperties => new Column(columnProperties));

            this.rows = this.data.map(rowData => new Row(rowData, this.columns));
        },

        created() {
            this.sort.fieldName = this.sortBy;
            this.sort.order = this.sortOrder;

            this.restoreState();
        },

        methods: {
            changeSorting(column) {
                if (this.sort.fieldName !== column.properties.for) {
                    this.sort.fieldName = column.properties.for;
                    this.sort.order = 'asc';
                }

                if (this.sort.fieldName === column.properties.for) {
                    this.sort.order = (this.sort.order === 'desc' ? 'asc' : 'desc');
                }

                this.saveState();
            },

            getColumn(columnName) {
                return this.columns.filter(column => column.properties.for === columnName)[0];
            },

            saveState() {
                expiringStorage.set(this.storageKey, pick(this.$data, ['filter', 'sort']), this.cacheLifetime);
            },

            restoreState() {
                const previousState = expiringStorage.get(this.storageKey);

                if (previousState === null) {
                    return;
                }

                this.filter = previousState.filter;
                this.sort = previousState.sort;

                this.saveState();
            },
        },
    };
</script>
