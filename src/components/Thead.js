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

    computed: {
        columnsWithState() {
            return this.columns.map(column => ({
                ...column,
                isActiveSortColumn: column.name === this.sortState.column,
                sortOrder: this.sortState.order,
            }));
        },
    },

    render() {
        if (this.renderThead) {
            return this.renderThead(keyBy(this.columnsWithState, 'name'));
        }

        return (
            <thead>
                <tr>
                    {this.columnsWithState.map(column => (
                        <Th
                            column={column}
                            key={column.name}
                            renderTh={this.renderTh}
                            onSort={e => this.$emit('sort', e)}
                        />
                    ))}
                </tr>
            </thead>
        );
    },
};
