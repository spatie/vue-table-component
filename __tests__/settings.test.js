import TableComponent from '../src/';
import settings from '../src/settings';

describe('settings', () => {
    it('can update settings', () => {
        TableComponent.settings({
            tableClass: 'table',
        });

        expect(settings.tableClass).toBe('table');
        expect(settings.filterPlaceholder).toBe('Filter table…');
        expect(settings.filterNoResults).toBe('There are no matching rows');
    });
});
