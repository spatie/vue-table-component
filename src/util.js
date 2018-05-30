// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
export function createCompareFunction({ column, order }) {
    let sortOrder = order === 'desc' ? -1 : 1;

    return function(a, b) {
        let result = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
        return result * sortOrder;
    };
}

// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function defaultFilterCallback({ row, query, columns }) {
    const normalizedQuery = query.toLowerCase().replace(/[^A-Za-z0-9]*/g, '');
    const filterableColumnNames = columns
        .filter(column => column.filterable !== false)
        .map(column => column.name);

    return pipe(
        row,
        [
            row => pick(row, filterableColumnNames),
            row => Object.values(row),
            values =>
                values
                    .join('')
                    .toLowerCase()
                    .replace(/[^A-Za-z0-9]*/g, ''),
            matchString => matchString.indexOf(normalizedQuery) !== -1,
        ]
    );
}

export function get(object, key) {
    return object[key];
}

export function keyBy(collection, key) {
    return collection.reduce((keyedCollection, item) => {
        keyedCollection[get(item, key)] = item;
    }, {});
}

export function pick(object, values) {
    return values.reduce((pickedObject, value) => {
        pickedObject[value] = object[value];
        return pickedObject;
    }, {});
}

export function pipe(subject, fns) {
    return fns.reduce((subject, fn) => fn(subject), subject);
}
