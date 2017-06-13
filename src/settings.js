import { merge } from 'lodash';

const settings = {
    tableClass: '',
    filterPlaceholder: 'Filter table…',
    filterNoResults: 'There are no matching rows',
};

export function mergeSettings(newSettings) {
    merge(settings, newSettings);
}

export default settings;
