import Td from './Td';

export default {
    name: 'Tbody',

    props: {
        rows: { required: true, type: Array },
        columns: { required: true, type: Array },
        itemKey: { required: true },
        renderTds: { required: true },
    },

    render() {
        return (
            <tbody>
                {this.rows.map((row, i) => (
                    <tr key={row[this.itemKey]}>
                        {this.columns.map((column, i) => (
                            <Td
                                key={column.name}
                                row={row}
                                column={column}
                                renderTd={this.renderTds[column.name]}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    },
};
