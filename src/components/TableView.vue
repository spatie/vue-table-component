<template>
    <div>
        <input type="text" v-model="filter">

        <table>
            <thead>
            <tr>
                <table-column-header
                        @click="changeSorting"
                        v-for="column in columns"
                        :key="column.properties.for"
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

        <div style="display:none">
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
                if (this.sortBy === '') {
                    return this.rows;
                }

                return this.rows.sort((row1, row2) => {
                    let value1 = row1.getValue(this.sort.fieldName);
                    let value2 = row2.getValue(this.sort.fieldName);

                    if (this.sort.order === 'asc') {
                        return value2.localeCompare(value1);
                    }

                    return value1.localeCompare(value2);
                });
            },
        },

        mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, ['for', 'label']))
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
        },
    };
</script>
