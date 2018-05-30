import Tbody from './Tbody';
import Thead from './Thead';
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
    name: 'TableComponent',

    props: {
        data: { required: true },
        columns: {
            validator: columns => Array.isArray(columns) && columns.every(column => !!column.name),
        },
        sortable: { default: true },
        sortBy: {},
        sortOrder: {},
        filterable: { default: true },
        filterQuery: {},
    },

    data() {
        return {
            sortState: {
                column: this.sortBy || null,
                order: this.sortOrder || 'asc',
            },
            filterState: {
                query: this.filterQuery || '',
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
            if (!this.sortState.column) {
                return undefined;
            }

            const column = this.columns.find(column => column.name === this.sortState.column);

            if (!column) {
                throw new Error(`Can't sort by unknown column "${this.sortState.column}"`);
            }

            return column.compareFunction || createCompareFunction(this.sortState);
        },

        rows() {
            const data = [...this.data];
            data.sort(this.compareFunction);

            return data;
        },
    },

    render() {
        return (
            <table>
                <Thead
                    renderTh={this.$scopedSlots.th}
                    renderThead={this.$scopedSlots.thead}
                    columns={this.columnsWithSanitizedSettings}
                    sortState={this.sortState}
                    onSort={sortState => (this.sortState = sortState)}
                />
                <Tbody rows={this.rows} columns={this.columnsWithSanitizedSettings} />
            </table>
        );
    },
};
