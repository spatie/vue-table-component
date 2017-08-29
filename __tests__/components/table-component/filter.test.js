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
                        :data="[{ firstName: 'John', lastName: 'Lennon' },
                                { firstName: 'Paul', lastName: 'McCartney' },
                                { firstName: 'George', lastName: 'Harrison' },
                                { firstName: 'Ringo', lastName: 'Starr' }]"
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
                        :data="[{ firstName: 'John', songs: 72 },
                                { firstName: 'Paul', songs: 70 },
                                { firstName: 'George', songs: 22 },
                                { firstName: 'Ringo', songs: 2 }]"
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

    it('can add a custom html class on the filter input', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ firstName: 'John', songs: 72 },
                                { firstName: 'Paul', songs: 70 },
                                { firstName: 'George', songs: 22 },
                                { firstName: 'Ringo', songs: 2 }]"
                        sort-by="lastName"
                        sort-order="desc"
                        filter-input-class="my-filter-class"
                    >
                        <table-column show="firstName" label="First name" filter-on="songs"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('hides the filter when no columns are filterable', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ firstName: 'John', songs: 72 },
                                { firstName: 'Paul', songs: 70 },
                                { firstName: 'George', songs: 22 },
                                { firstName: 'Ringo', songs: 2 }]"
                        sort-by="lastName"
                        sort-order="desc"
                    >
                        <table-column show="firstName" label="First name" :filterable="false"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        await createVm();

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
