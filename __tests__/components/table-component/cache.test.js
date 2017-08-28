import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';
import expiringStorage from '../../../src/expiring-storage';
import simulant from 'simulant';

import LocalStorageMock from '../../helpers/LocalStorageMock';

const localStorage = new LocalStorageMock();

window.localStorage = localStorage;

describe('Caching tableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
        localStorage.clear();

        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        cache-id="#test"
                        :data="[{ id: 1, firstName: 'John', lastName: 'Lennon' },
                                { id: 2, firstName: 'Paul', lastName: 'McCartney' }]"
                    >
                        <table-column show="firstName" label="First name"></table-column>
                        <table-column show="lastName" label="Last name"></table-column>
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

        expiringStorage.set('vue-table-component.blank#test', cacheContent, 5);

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

        expiringStorage.set('vue-table-component.blank#test', cacheContent, 5);

        progressTime(6);

        const table = await createVm();

        expect(table.filter).toEqual('');
        expect(table.sort.fieldName).toEqual('');
        expect(table.sort.order).toEqual('');
    });

    it('will cache the filter', async () => {
        const table = await createVm();

        table.filter = 'cache this';

        await Vue.nextTick(() => {});

        expect(localStorage.getAll()).toMatchSnapshot();
    });

    it('will cache a the sort column', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        cache-id="#test"
                        :data="[{ firstName: 'John', songs: 30 },
                                { firstName: 'Paul', songs: 20 },
                                { firstName: 'George', songs: 420 },
                                { firstName: 'Ringo', songs: 210 }]"
                    >
                        <table-column show="firstName" label="First name" sort-by="songs"></table-column>
                        <table-column show="songs" data-type="numeric" label="Songs" sort-by="songs"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        await createVm();

        const secondColumnHeader = document.getElementsByTagName('th')[1];

        await simulant.fire(secondColumnHeader, 'click');

        expect(localStorage.getAll()).toMatchSnapshot();
    });
});

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    const table = vm.$children[0];

    return table;
}

function progressTime(minutes) {
    const currentTime = (new Date()).getTime();

    const newTime = new Date(currentTime + (minutes * 60000));

    const originalDateClass = Date;

    // eslint-disable-next-line no-global-assign
    Date = function (dateString) {
        return new originalDateClass(dateString || newTime.toISOString());
    };
}
