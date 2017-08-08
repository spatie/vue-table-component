<template>
    <tr>
        <table-cell
            v-for="column in visibleColumns"
            :row="row"
            :column="column"
            :class="column.properties.cellClass"
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
    };
</script>
