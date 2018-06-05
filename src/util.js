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

export function defaultFilterCallback({ query }) {
    const normalizedQuery = query.toLowerCase().replace(/[^A-Za-z0-9]*/g, '');

    return (row) => {
        return pipe(
            row,
            [
                row => Object.values(row),
                values =>
                    values
                        .join('')
                        .toLowerCase()
                        .replace(/[^A-Za-z0-9]*/g, ''),
                matchString => matchString.indexOf(normalizedQuery) !== -1,
            ]
        );
    };
}

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
export function defaultSortCallback({ sortBy, sortOrder }) {
    return (a, b) => {
        let sortOrderIndex = sortOrder === 'desc' ? -1 : 1;

        const result = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;

        return result * sortOrderIndex;
    };
}

export function keyBy(collection, key) {
    return collection.reduce((keyedCollection, item) => {
        keyedCollection[get(item, key)] = item;
        return keyedCollection;
    }, {});
}
