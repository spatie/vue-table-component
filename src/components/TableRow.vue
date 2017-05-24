<template>
    <tr>
    <td v-for="column in columns" v-html="getValue(column)">
    </td>
    </tr>
</template>

<script>
    export default {
        props: ['column', 'row'],

        methods: {
            getValue(column) {
                const key = column.field || column.name

                return row.key;
            }
        }
    }
</script>