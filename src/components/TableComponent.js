import Tbody from './Tbody';
import Tfoot from './Tfoot';
import Thead from './Thead';
import { createCompareFunction, defaultFilterCallback, debounce } from '../util';

export default {
    name: 'TableComponent',

    props: {
        data: { required: true, type: [Array, Function] },
        columns: {
            validator: columns => Array.isArray(columns) && columns.every(column => !!column.name),
        },
        itemKey: { default: 'id' },
        sortable: { default: true },
        sortBy: {},
        sortOrder: {},
        filterable: { default: true },
        filterQuery: {},
        filterCallback: { default: defaultFilterCallback, type: Function },
        debounceMs: { default: 200 },
    },

    data() {
        return {
            visibleRows: [],
            visibleRowCount: 0,
            totalRowCount: 0,
            sortState: {
                column: this.sortBy || null,
                order: this.sortOrder || 'asc',
            },
            filterState: {
                query: this.filterQuery || '',
            },
        };
    },

    created() {
        const stateAttributes = ['sortState', 'filterState'];

        if (this.usesExternalDataSource) {
            const getVisibleRows = debounce(this.getVisibleRows, this.debounceMs);

            getVisibleRows();

            stateAttributes.forEach(attribute => {
                this.$watch(attribute, getVisibleRows, { deep: true });
            });
        } else {
            this.getVisibleRows();

            stateAttributes.forEach(attribute => {
                this.$watch(attribute, this.getVisibleRows, { deep: true });
            });
        }
    },

    computed: {
        usesExternalDataSource() {
            return typeof this.data === 'function';
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

        renderTds() {
            return this.columns.reduce((renderTds, column) => {
                renderTds[column.name] = this.$scopedSlots[column] || this.$scopedSlots.td;
                return renderTds;
            }, {});
        },
    },

    methods: {
        getVisibleRows() {
            if (this.usesExternalDataSource) {
                this.getVisibleRowsFromDataSource();
            } else {
                this.getVisibleRowsFromLocalData();
            }
        },

        getVisibleRowsFromDataSource() {
            this.data({
                sortBy: this.sortState.column,
                sortOrder: this.sortState.order,
                filterQuery: this.filterState.query,
            }).then(response => {
                this.visibleRows = response.data;
                this.visibleRowCount = response.data.length;
                this.totalRowCount = response.data.length;
            });
        },

        getVisibleRowsFromLocalData() {
            let data = [...this.data];

            if (this.filterable && this.filterState.query) {
                data = data.filter(row => {
                    return this.filterCallback({
                        row,
                        columns: this.columns,
                        query: this.filterState.query,
                    });
                });
            }

            data.sort(this.compareFunction);

            this.visibleRows = data;
            this.visibleRowCount = data.length;
            this.totalRowCount = this.data.length;
        },
    },

    render() {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={this.filterState.query}
                        onInput={e => (this.filterState.query = e.target.value)}
                    />
                </div>
                <table>
                    <Thead
                        renderTh={this.$scopedSlots.th}
                        renderThead={this.$scopedSlots.thead}
                        columns={this.columns}
                        sortState={this.sortState}
                        onSort={sortState => {
                            this.sortState = sortState;
                        }}
                    />
                    <Tbody
                        rows={this.visibleRows}
                        itemKey={this.itemKey}
                        renderTds={this.renderTds}
                        columns={this.columns}
                    />
                    <Tfoot
                        totalRowCount={this.totalRowCount}
                        visibleRowCount={this.visibleRowCount}
                        renderTfoot={this.$scopedSlots.tfoot}
                    />
                </table>
            </div>
        );
    },
};
