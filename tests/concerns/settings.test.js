import TableComponent from '../../src/';
import settings from '../../src/settings';

describe('settings', () => {
    it('can update settings', () => {
        TableComponent.settings({
            tableClass: 'table',
            theadClass: 'table-head',
            tbodyClass: 'table-body',
        });

        expect(settings.tableClass).toBe('table');
        expect(settings.theadClass).toBe('table-head');
        expect(settings.tbodyClass).toBe('table-body');
        expect(settings.filterPlaceholder).toBe('Filter table…');
        expect(settings.filterNoResults).toBe('There are no matching rows');
    });
});
