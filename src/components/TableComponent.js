import Body from './Body';
import Head from './Head';
import { createCompareFunction, get } from '../util';

function createColumnAccessor(column) {
    if (column.accessor && typeof column.accessor === 'string') {
        return row => get(row, column.accessor);
    }

    if (column.accessor && typeof column.accessor === 'function') {
        return row => column.accessor(row);
    }

    return row => row[column.name];
}

export default {
    props: {
        data: { required: true },
        columns: {
            validator: columns => Array.isArray(columns) && columns.every(column => !!column.name),
        },
        sortBy: {},
        sortOrder: {},
    },

    data() {
        return {
            state: {
                sortBy: this.sortBy || null,
                sortOrder: this.sortOrder || 'asc',
            },
        };
    },

    computed: {
        columnsWithSanitizedSettings() {
            return this.columns.map(column => ({
                ...column,
                renderCell: this.$scopedSlots[column.name] || createColumnAccessor(column),
            }));
        },

        compareFunction() {
            if (!this.state.sortBy) {
                return undefined;
            }

            const column = this.columns.find(column => column.name === this.state.sortBy);

            if (!column) {
                throw new Error(`Can't sort by unknown column "${this.state.sortBy}"`);
            }

            return (
                column.compareFunction ||
                createCompareFunction(this.state.sortBy, this.state.sortOrder)
            );
        },

        rows() {
            const data = [...this.data];
            data.sort(this.compareFunction);

            return data;
        },
    },

    methods: {
        sort(sortBy, sortOrder) {
            this.state.sortBy = sortBy;
            this.state.sortOrder = sortOrder;
        },
    },

    render() {
        return (
            <table>
                <Head
                    renderTh={this.$scopedSlots.th}
                    renderThead={this.$scopedSlots.thead}
                    columns={this.columnsWithSanitizedSettings}
                    sort={this.sort}
                    sortBy={this.state.sortBy}
                    sortOrder={this.state.sortOrder}
                />
                <Body rows={this.rows} columns={this.columnsWithSanitizedSettings} />
            </table>
        );
    },
};
