export default class Column {
    constructor(properties) {
        this.properties = properties;
    }

    isFilterable() {
        return this.properties.filterable;
    }

    getFilterFieldName() {
        return this.properties.filterOn || this.properties.show;
    }

    isSortable() {
        return this.properties.sortable;
    }

    getSortPredicate(sortOrder, allColumns) {
        const sortFieldName = this.getSortFieldName();

        const sortColumn = allColumns.find(column => column.properties.show === sortFieldName);

        const dataType = sortColumn.properties.dataType;

        if (dataType.startsWith('date') || dataType === 'numeric') {

            return (row1, row2) => {
                const value1 = row1.getSortableValue(sortFieldName);
                const value2 = row2.getSortableValue(sortFieldName);

                if (sortOrder === 'desc') {
                    return value2 < value1 ? -1 : 1;
                }

                return value1 < value2 ? -1 : 1;
            };
        }

        return (row1, row2) => {
            const value1 = row1.getSortableValue(sortFieldName);
            const value2 = row2.getSortableValue(sortFieldName);

            if (sortOrder === 'desc') {
                return value2.localeCompare(value1);
            }

            return value1.localeCompare(value2);
        };
    }

    getSortFieldName() {
        return this.properties.sortBy || this.properties.show;
    }
}
