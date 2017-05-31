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
                const key = column.field || column.name
                console.log(column.name); // undefined :-(
                return this.row[key];
            }
        }
    }
</script>