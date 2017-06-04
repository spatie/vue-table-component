export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return this.data[columnName];
    }

    passesFilter(filter) {
        return this.columns
            .filter(column =>  column.isFilterable())
            .map(column => this.getValue(column.properties.for))
            .filter(columnValue => columnValue.toLowerCase().includes(filter.toLowerCase()))
            .length;
    }
}

