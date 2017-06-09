import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';
import LocalStorageMock from '../../helpers/LocalStorageMock';

const localStorage = new LocalStorageMock();

window.localStorage = localStorage;

describe('Filterable tableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
        localStorage.clear();

        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ id: 1, firstName: 'John', lastName: 'Lennon' },
                                { id: 2, firstName: 'Paul', lastName: 'McCartney' },
                                { id: 3, firstName: 'George', lastName: 'Harrison' },
                                { id: 4, firstName: 'Ringo', lastName: 'Starr' }]"
                        sort-by="lastName"
                        sort-order="desc"
                    >
                        <table-column show="firstName" label="First name"></table-column>
                        <table-column show="lastName" label="Last name" :filterable="false"></table-column>
                    </table-component>
                </div>
            </div>
        `;
    });

    it('can filter data', async () => {
        const table = await createVm();

        table.filter = 'Paul';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will filter data in a case-insensitive way', async () => {
        const table = await createVm();

        table.filter = 'paul';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will display a message if there are no matching rows', async () => {
        const table = await createVm();

        table.filter = 'there are no rows that match this';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will not use columns that are not filterable', async () => {
        const table = await createVm();

        table.filter = 'Lennon';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can filter on another property', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ id: 1, firstName: 'John', songs: 72 },
                                { id: 2, firstName: 'Paul', songs: 70 },
                                { id: 3, firstName: 'George', songs: 22 },
                                { id: 4, firstName: 'Ringo', songs: 2 }]"
                        sort-by="lastName"
                        sort-order="desc"
                    >
                        <table-column show="firstName" label="First name" filter-on="songs"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        const table = await createVm();

        table.filter = '70';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
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
