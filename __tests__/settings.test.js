import TableComponent from '../src/';
import settings from '../src/settings';

describe('settings', () => {
    it('can update settings', () => {
        TableComponent.settings({
            tableClass: 'table',
            theadClass: 'table-head'
        });

        expect(settings.tableClass).toBe('table');
        expect(settings.theadClass).toBe('table-head');
        expect(settings.filterPlaceholder).toBe('Filter table…');
        expect(settings.filterNoResults).toBe('There are no matching rows');
    });
});
