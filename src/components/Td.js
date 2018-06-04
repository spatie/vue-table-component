import { get } from '../util';

export default {
    name: 'Td',

    props: {
        row: { required: true },
        column: { required: true },
        renderTd: { required: true },
    },

    render() {
        if (this.renderTd) {
            return <td>{this.renderTd({ row: this.row, column: this.column })}</td>;
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
