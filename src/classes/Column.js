export default class Column {
    constructor(properties) {
        this.properties = properties;
    }

    isFilterable() {
        return this.properties.filterable;
    }

    isSortable() {
        return this.properties.sortable;
    }
}