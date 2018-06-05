import { stateProvider } from './TableComponent';

export default {
    name: 'TableHeader',

    props: ['name'],

    inject: {
        state: stateProvider,
    },

    computed: {
        isActiveSortColumn() {
            return this.state.sortBy === this.name;
        },
    },

    methods: {
        toggleSort() {
            if (!this.name) {
                throw new Error("Can't toggle sort without a name prop on TableHeader");
            }

            if (this.isActiveSortColumn) {
                this.state.sortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
                return;
            }

            this.state.sortBy = this.name;
            this.state.sortOrder = 'asc';
        },
    },

    render() {
        return (
            <th onClick={this.name ? this.toggleSort : null}>
                {this.$scopedSlots.default
                    ? this.$scopedSlots.default({
                        toggleSort: this.toggleSort,
                        isActiveSortColumn: this.isActiveSortColumn,
                    })
                    : this.$slots.default}
            </th>
        );
    },
};
