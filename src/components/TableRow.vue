<template>
    <tr @click="$emit('rowClick', row)">
        <table-cell
            v-for="column in visibleColumns"
            :row="row"
            :index="index"
            :column="column"
            :key="column.id"
        ></table-cell>
    </tr>
</template>

<script>
    import TableCell from './TableCell';

    export default {
        props: ['columns', 'row', 'index'],

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
