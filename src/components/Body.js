export default {
    props: {
        rows: { required: true, type: Array },
        columns: { required: true, type: Array },
    },

    render() {
        return (
            <tbody>
                {this.rows.map(row => (
                    <tr>
                        {this.columns.map((column, i) => <td key={i}>{column.renderCell(row)}</td>)}
                    </tr>
                ))}
            </tbody>
        );
    },
};
