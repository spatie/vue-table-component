import isArray from 'lodash/isArray';

export function classList(...classes) {
    return classes
        .map(c => isArray(c) ? c : [c])
        .reduce((classes, c) => classes.concat(c), []);
}
