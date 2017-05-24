<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="column in columns">
                    {{ column.name }}
                </th>
            </tr>
            </thead>
            <tbody>
                <table-row v-for="row in rows" :row="row" :columns="columns" />
            </tbody>
        </table>
    </div>
</template>

<script>
    import TableRow from './TableRow';

    export default {
        components: { TableRow },

        props: {
            rows: {
                required: true,
            },
            sortBy: {
                type: String,
                required: false,
                default: '',
            },
            sortOrder: {
                type: String,
                required: false,
                default: 'desc',
            }
        },

        data: () => ({}),

        created() {
            this.columns = this.$children;
        },

        computed: {},
    };

</script>
