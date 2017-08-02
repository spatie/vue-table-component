import moment from 'moment';
import striptags from 'striptags';

export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return this.data[columnName];
    }

    getColumn(columnName) {
        return this.columns.find(column => column.properties.show === columnName);
    }

    getFilterableValue(columnName) {
        const value = this.getValue(columnName).toString().toLowerCase();

        return value === null ? value : striptags(value);
    }

    getSortableValue(columnName) {
        const dataType = this.getColumn(columnName).properties.dataType;

        let value = this.getValue(columnName);

        if (value instanceof String) {
            value = value.toLowerCase();
        }

        if (dataType.startsWith('date')) {
            // eslint-disable-next-line no-unused-vars
            const [_, format]  = dataType.split(':');

            return moment(value, format).format('YYYYMMDDHHmmss');
        }

        if (dataType === 'numeric') {
            return value;
        }

        return value.toString();
    }

    isFooterRow() {
        return this.data.isFooterRow;
    }

    passesFilter(filter) {
        return this.columns
            .filter(column => column.isFilterable())
            .map(column => this.getFilterableValue(column.getFilterFieldName()))
            .filter(filterableValue => filterableValue.includes(filter.toLowerCase()))
            .length;
    }
}
