export default {
    props: {
        totalRowCount: { required: true },
        visibleRowCount: { required: true },
        renderTfoot: { required: true },
    },

    render() {
        if (this.renderTfoot) {
            return (
                <tfoot>
                    {this.renderTfoot({
                        totalRowCount: this.totalRowCount,
                        visibleRowCount: this.visibleRowCount,
                    })}
                </tfoot>
            );
        }

        return (
            <tfoot>
                Displaying {this.visibleRowCount} of {this.totalRowCount} results.
            </tfoot>
        );
    }
}
