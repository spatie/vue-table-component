import TableView from '../../../src';
import Vue from 'vue/dist/vue.js';

describe('Filterable tableView', () => {
    Vue.use(TableView);

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-view
                        :data="[{ id: 1, firstName: 'Jay', lastName: 'Vleugels' },
                                { id: 2, firstName: 'Wesley', lastName: 'Biets' },
                                { id: 3, firstName: 'Randy', lastName: 'Paret' },
                                { id: 4, firstName: 'Devon', lastName: 'Macharis' }]"
                        sort-by="lastName"
                        sort-order="desc"
                    >
                        <table-column for="firstName" label="First name"></table-column>
                        <table-column for="lastName" label="Last name" :filterable="false"></table-column>
                    </table-view>
                </div>
            </div>
        `;


    });

    it('can filter data', async () => {

        const table = await createVm();

        table.filter = 'Wesley';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will filter data in a case-insensitive way', async () => {

        const table = await createVm();

        table.filter = 'wesley';

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

        table.filter = 'Vleugels';

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
