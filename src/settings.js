import { merge } from 'lodash';

export const settings = {
    classNames: {
        row: 'row',
        cell: 'cell',
    },
};

export function mergeSettings(newSettings) {
    merge(settings, newSettings);
}

export default {
    data: () => ({ settings }),
}
