import { defaultSortCallback, defaultFilterCallback, debounce } from '../util';

export const stateProvider = Symbol();

export default {
    name: 'TableComponent',

    props: {
        data: { required: true, type: [Array, Function] },
        debounceMs: { default: 0 },
        itemKey: { default: 'id' },

        sortBy: {},
        sortOrder: {},
        sortCallback: { default: defaultSortCallback, type: Function },

        filterQuery: {},
        filterCallback: { default: defaultFilterCallback, type: Function },
    },

    data() {
        return {
            visibleRows: [],
            visibleRowCount: 0,
            totalRowCount: 0,

            state: {
                sortBy: this.sortBy || null,
                sortOrder: this.sortOrder || 'asc',
                filterQuery: this.filterQuery || ''
            },
        };
    },

    provide() {
        return {
            [stateProvider]: this.state,
        }
    },

    created() {
        const getVisibleRows = typeof this.data === 'function'
            ? this.getVisibleRowsFromDataSource
            : this.getVisibleRowsFromLocalData;

        getVisibleRows();

        this.$watch(
            'state',
            debounce(getVisibleRows, this.debounceMs),
            { deep: true }
        );
    },

    methods: {
        getVisibleRowsFromDataSource() {
            this.data(this.state).then(response => {
                this.visibleRows = response.data;
                this.visibleRowCount = response.data.length;
                this.totalRowCount = response.data.length;
            });
        },

        getVisibleRowsFromLocalData() {
            let data = [...this.data];

            if (this.state.filterQuery) {
                data = data.filter(this.filterCallback(this.state));
            }

            data.sort(this.sortCallback(this.state));

            this.visibleRows = data;
            this.visibleRowCount = data.length;
            this.totalRowCount = this.data.length;
        },
    },

    render() {
        const renderPrepend = this.$scopedSlots.prepend
            ? this.$scopedSlots.prepend
            : () => this.$slots.prepend;

        const renderAppend = this.$scopedSlots.append
            ? this.$scopedSlots.append
            : () => this.$slots.append;

        const renderThead = this.$scopedSlots.thead
            ? this.$scopedSlots.thead
            : () => this.$slots.thead;

        const renderTfoot = this.$scopedSlots.tfoot
            ? this.$scopedSlots.tfoot
            : () => this.$slots.tfoot;

        return (
            <div>
                {renderPrepend({
                    visibleRowCount: this.visibleRowCount,
                    totalRowCount: this.totalRowCount,
                })}
                <table>
                    <thead>
                        {renderThead()}
                    </thead>
                    <tbody>
                        {this.visibleRows.map(row => (
                            this.$scopedSlots.tbody({
                                key: row[this.itemKey],
                                row,
                            })
                        ))}
                    </tbody>
                    <tfoot>
                        {renderTfoot({
                            visibleRowCount: this.visibleRowCount,
                            totalRowCount: this.totalRowCount,
                        })}
                    </tfoot>
                </table>
                {renderAppend({
                    visibleRowCount: this.visibleRowCount,
                    totalRowCount: this.totalRowCount,
                })}
            </div>
        );
    },
};
