export default {
    props: {
        columns: { required: true },
        renderTh: { required: true },
        renderThead: { required: true },
        sort: { required: true },
        sortBy: { required: true },
        sortOrder: { required: true },
    },

    computed: {
        columnStates() {
            return this.columns.reduce((columnHeaders, column) => {
                columnHeaders[column.name] = {
                    ...column,
                    isActiveSortColumn: column.name === this.sortBy,
                    sortOrder: column.name === this.sortBy ? this.sortOrder : null,
                };

                return columnHeaders;
            }, {});
        },
    },

    render() {
        if (this.renderThead) {
            return this.renderThead(this.columnStates);
        }

        return (
            <thead>
                <tr>
                    {this.columns.map(column => (
                        <th
                            key={column.name}
                            onClick={() => {
                                const sortOrder = (this.columnStates[column.name].isActiveSortColumn && this.sortOrder === 'asc') ? 'desc' : 'asc';
                                this.sort(column.name, sortOrder);
                            }}
                        >
                            {this.renderTh ? this.renderTh({ column, sort: this.sort }) : column.label}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    },
};
