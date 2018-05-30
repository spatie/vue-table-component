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
    name: 'Td',

    props: {
        row: { required: true },
        column: { required: true },
        renderTd: { required: true },
    },

    render() {
        if (this.renderTd) {
            return <td>{this.renderTd(this.row)}</td>;
        }

        if (this.column.accessor && typeof this.column.accessor === 'string') {
            return <td>{get(this.row, this.column.accessor)}</td>;
        }

        if (this.column.accessor && typeof this.column.accessor === 'function') {
            return <td>{this.column.accessor(this.row)}</td>;
        }

        return <td>{this.row[this.column.name]}</td>;
    },
};
