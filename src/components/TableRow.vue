<template>
    <tr>
        <td v-for="column in columns" v-html="getValue(column)"></td>
    </tr>
</template>

<script>
    import settings from '../settings';

    export default {
        props: ['columns', 'row'],

        methods: {
            getValue(column) {
                return this.row.getValue(column.properties.show);
            },
        },
    };
</script>
