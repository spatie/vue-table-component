export function get(object, key) {
    return object[key];
}

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
export function createCompareFunction(property, order) {
    let sortOrder = order === 'desc' ? -1 : 1;

    return function(a, b) {
        let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}
