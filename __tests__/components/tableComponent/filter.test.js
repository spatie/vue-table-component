import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';

describe('Filterable tableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
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
                        <table-column for="firstName" label="First name"></table-column>
                        <table-column for="lastName" label="Last name" :filterable="false"></table-column>
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


});



async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    const table = vm.$children[0];

    return table ;
}
