<template>
    <tr>
    <td v-for="column in columns" v-html="getValue(column)">
    </td>
    </tr>
</template>

<script>
    export default {
        props: ['columns', 'row'],

        methods: {
            getValue(column) {
                console.log(column);
                return this.row.getValue(column.properties.for);
            }
        }
    }
</script>
