<template>
    <div>
        <input type="text" v-model="filter">

        <table>
            <thead>
            <tr>
                <slot></slot>
            </tr>
            </thead>
            <tbody>
                <table-row :key="row.id" v-for="row in displayedRows" :row="row" :columns="columns" />
            </tbody>
        </table>
    </div>
</template>

<script>
    import { pick } from 'lodash';
    import TableRow from './TableRow';
    import Column from '../classes/Column';
    import Row from '../classes/Row';

    export default {
        components: { 
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
        }),

        computed: {
            displayedRows() {
                return this.rows.filter(row => row.passesFilter(this.filter));
            }
        },

        mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, ['for', 'label']))
                .map(columnProperties => new Column(columnProperties));

            this.rows = this.data.map(rowData => new Row(rowData, this.columns));
        },


    };
</script>
