<template>
    <tr>
        <td v-for="column in visibleColumns" v-html="getValue(column)" :class="column.properties.cellClass"></td>
    </tr>
</template>

<script>
    export default {
        props: ['columns', 'row'],

        computed: {
            visibleColumns() {
                return this.columns.filter(column => ! column.properties.hidden);
            },
        },

        methods: {
            getValue(column) {
                let value = this.row.getValue(column.properties.show, column.properties);

                return column.properties.formatter(value);
            },
        },
    };
</script>
