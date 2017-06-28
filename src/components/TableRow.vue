<template>
    <tr>
        <td v-for="column in visibleColumns" v-html="getValue(column)"></td>
    </tr>
</template>

<script>
    export default {
        props: ['columns', 'row'],

        computed: {
            visibleColumns() {
                return this.columns.filter(column => !column.properties.hidden);
            },
        },

        methods: {
            getValue(column) {
                return this.row.getValue(column.properties.show);
            },
        },
        
    };
</script>
