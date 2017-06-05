import { stripHtml } from '../helpers';

export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return this.data[columnName];
    }

    getFilterableValue(columnName) {
        const value = this.getValue(columnName);

        return stripHtml(value);
    }

    passesFilter(filter) {
        return this.columns
            .filter(column =>  column.isFilterable())
            .map(column => this.getFilterableValue(column.properties.for))
            .filter(columnValue => columnValue.toLowerCase().includes(filter.toLowerCase()))
            .length;
    }
}

