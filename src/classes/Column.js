export default class Column
{
    constructor(properties) {
        this.properties = properties;
    }

    isFilterable() {
        return this.properties.filterable || true;
    }
}