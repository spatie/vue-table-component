import moment from 'moment';
import striptags from 'striptags';
import get from 'lodash/get';

export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return get(this.data, columnName);
    }

    getColumn(columnName) {
        return this.columns.find(column => column.show === columnName);
    }

    getFilterableValue(columnName) {
        const value = this.getValue(columnName);

        if (! value) {
            return '';
        }

        return striptags(
            value.toString().toLowerCase()
        );
    }

    getSortableValue(columnName) {
        const dataType = this.getColumn(columnName).dataType;

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

    passesFilter(filter) {
        return this.columns
            .filter(column => column.isFilterable())
            .map(column => this.getFilterableValue(column.getFilterFieldName()))
            .filter(filterableValue => filterableValue.includes(filter.toLowerCase()))
            .length;
    }
}
