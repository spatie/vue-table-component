import Th from './Th';
import { keyBy } from '../util';

export default {
    name: 'Thead',

    props: {
        columns: { required: true },
        renderTh: { required: true },
        renderThead: { required: true },
        sortState: {
            required: true,
            validator: sortState =>
                sortState.hasOwnProperty('column') && sortState.hasOwnProperty('order'),
        },
    },

    render() {
        const columnsWithState = this.columns.map(column => ({
            ...column,
            isActiveSortColumn: column.name === this.sortState.column,
            sortOrder: this.sortState.order,
            toggleSort: () => {
                this.$emit('sort', {
                    column: column.name,
                    order: column.name === this.sortState.column && this.sortState.order === 'asc'
                        ? 'desc'
                        : 'asc',
                });
            },
        }));

        if (this.renderThead) {
            return this.renderThead({ columns: keyBy(columnsWithState, 'name') })[0];
        }

        return (
            <thead>
                <tr>
                    {columnsWithState.map(column => (
                        <Th
                            column={column}
                            key={column.name}
                            renderTh={this.renderTh}
                            onSort={() => {
                                column.toggleSort();
                            }}
                        />
                    ))}
                </tr>
            </thead>
        );
    },
};
