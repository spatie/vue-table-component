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

    getSortPredicate(sortOrder) {
        const dataType = this.properties.dataType;

        if (this.properties.dataType.startsWith('date') || dataType === 'numeric') {

            return (row1, row2) => {
                const value1 = row1.getSortableValue(this.properties.show);
                const value2 = row2.getSortableValue(this.properties.show);

                if (sortOrder === 'desc') {
                    return value2 < value1;
                }

                return value1 < value2;
            };
        }

        return (row1, row2) => {
            const value1 = row1.getSortableValue(this.properties.show);
            const value2 = row2.getSortableValue(this.properties.show);

            if (sortOrder === 'desc') {
                return value2.localeCompare(value1);
            }

            return value1.localeCompare(value2);
        };
    }
}