<template>
    <div>
        <input type="text" v-model="filter" name="table-view-filter">
        <div v-if="filter !== ''">
            <a @click="filter = ''">X</a>
        </div>

        <table>
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
        <div v-if="displayedRows.length === 0">
            There are no matching rows
        </div>

        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { pick } from 'lodash';
    import TableColumnHeader from './TableColumnHeader';
    import TableRow from './TableRow';
    import Column from '../classes/Column';
    import Row from '../classes/Row';

    export default {
        components: {
            TableColumnHeader,
            TableRow,
        },

        props: {
            data: { required: true, type: Array },
            sortBy: { default: '', type: String },
            sortOrder: { default: 'desc', type: String },
        },

        data: () => ({
            filter: '',
            columns: [],
            rows: [],
            sort: {
                fieldName: '',
                order: '',
            }
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

                return this.rows.sort(sortColumn.getSortPredicate(this.sort.order));
            },
        },

        mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, [
                    'for', 'label', 'sortable', 'filterable', 'dataType'
                ]))
                .map(columnProperties => new Column(columnProperties));

            this.rows = this.data.map(rowData => new Row(rowData, this.columns));
        },

        created() {
            this.sort.fieldName = this.sortBy;
            this.sort.order = this.sortOrder;
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
            },

            getColumn(columnName) {
                return this.columns.filter(column => column.properties.for === columnName)[0];
            }
        },
    };







</script>
