<template>
    <tr>
        <table-cell
            v-for="column in visibleColumns"
            :row="row.data"
            :column="column"
        ></table-cell>
    </tr>
</template>

<script>
    import TableCell from './TableCell';

    export default {
        props: ['columns', 'row'],

        components: {
            TableCell,
        },

        computed: {
            visibleColumns() {
                return this.columns.filter(column => ! column.hidden);
            },
        },

        methods: {
            getValue(column) {
                return this.row.getValue(column.show, column);
            },
        },
    };
</script>
