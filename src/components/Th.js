export default {
    name: 'Th',

    props: {
        column: { required: true },
        renderTh: { required: true },
    },

    methods: {
        toggleSort() {
            const newSortState = {
                column: this.column.name,
                order: 'asc',
            };

            if (this.column.isActiveSortColumn && this.column.sortOrder === 'asc') {
                newSortState.order = 'desc';
            }

            this.$emit('sort', newSortState);
        },
    },

    render() {
        return (
            <th onClick={this.toggleSort}>
                {this.renderTh
                    ? this.renderTh({ ...this.column, toggleSort: this.toggleSort })
                    : this.column.label}
            </th>
        );
    },
};
