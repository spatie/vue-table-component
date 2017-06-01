<template>
    <div>
        <table>
            <thead>
            <tr>
                <slot></slot>
            </tr>
            </thead>
            <tbody>
                <table-row :key="row.id" v-for="row in rows" :row="row" :columns="columns" />
            </tbody>
        </table>
    </div>
</template>

<script>
    import { pick } from 'lodash';
    import TableRow from './TableRow';

    export default {
        components: { 
            TableRow
        },

        props: {
            rows: { required: true, type: Array },
            sortBy: { default: '', type: String },
            sortOrder: { default: 'desc', type: String },
        },

        data: () => ({
            columns: [],
        }),

        mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, ['for', 'label']));

            console.log(this.columns);
        },
    };
</script>
