import TableComponent from '../src/';
import { settings } from '../src/settings';

describe('settings', () => {
    it('can update settings', () => {
        TableComponent.settings({
            classNames: {
                row: 'foobar',
            },
        });

        expect(settings.classNames.row).toBe('foobar');
        expect(settings.classNames.cell).toBe('cell');
    });
});
