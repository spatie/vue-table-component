import expiringStorage from '../../src/expiring-storage';
import simulant from 'simulant';
import createVm from '../createVm';

describe('Caching', () => {
    beforeEach(() => {
        localStorage.clear();

        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        cache-key="test"
                        :data="[{ firstName: 'John', lastName: 'Lennon', songs: 30 },
                                { firstName: 'Paul', lastName: 'McCartney', songs: 20 },
                                { firstName: 'George', lastName: 'Harrison', songs: 420 },
                                { firstName: 'Ringo', lastName: 'Starr', songs: 210 }]"
                    >
                        <table-column show="firstName" label="First name"></table-column>
                        <table-column show="lastName" label="Last name"></table-column>
                        <table-column show="songs" data-type="numeric" label="Songs" sort-by="songs"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        const dateClass = Date;

        // eslint-disable-next-line no-global-assign
        Date = function (dateString) {
            return new dateClass(dateString || '2017-01-01T00:00:00.000Z');
        };
    });

    it('will cache the used filter and sorting', async () => {
        const cacheContent = {
            filter: 'Paul',
            sort:{
                fieldName: 'firstName',
                order:'asc',
            },
        };

        expiringStorage.set('vue-table-component.test', cacheContent, 5);

        progressTime(4);

        const table = await createVm();

        expect(table.filter).toEqual('Paul');
        expect(table.sort.fieldName).toEqual('firstName');
        expect(table.sort.order).toEqual('asc');
    });

    it('will not use the cache when it has expired', async () => {
        const cacheContent = {
            filter: 'Paul',
            sort:{
                fieldName: 'firstName',
                order:'asc',
            },
        };

        expiringStorage.set('vue-table-component.test', cacheContent, 5);

        progressTime(6);

        const table = await createVm();

        expect(table.filter).toEqual('');
        expect(table.sort.fieldName).toEqual('');
        expect(table.sort.order).toEqual('');
    });

    it('will cache the filter', async () => {
        await createVm(table => {
            table.filter = 'cache this';
        });

        const localStorageContents = JSON.parse(localStorage.getItem('vue-table-component.test'));

        expect(localStorageContents.value.filter).toBe('cache this');
    });

    it('will cache a the sort column', async () => {
        await createVm();

        const songsColumnHeader = document.getElementsByTagName('th')[2];
        await simulant.fire(songsColumnHeader, 'click');

        const localStorageContents = JSON.parse(localStorage.getItem('vue-table-component.test'));

        expect(localStorageContents.value.sort.fieldName).toBe('songs');
    });
});

function progressTime(minutes) {
    const currentTime = (new Date()).getTime();

    const newTime = new Date(currentTime + (minutes * 60000));

    const originalDateClass = Date;

    // eslint-disable-next-line no-global-assign
    Date = function (dateString) {
        return new originalDateClass(dateString || newTime.toISOString());
    };
}
