<template>
    <tr :class="settings.classNames.row">
        <td v-for="column in columns" v-html="getValue(column)"></td>
    </tr>
</template>

<script>
    import settings from '../settings';

    export default {
        mixins: [settings],

        props: ['columns', 'row'],

        methods: {
            getValue(column) {
                return this.row.getValue(column.properties.show);
            },
        },
    };
</script>
