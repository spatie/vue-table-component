import TableView from '../../../src';
import Vue from 'vue/dist/vue.js';

describe('TableView is sortable', () => {
    Vue.use(TableView);

    it('can sort the data with by a specific column', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName' });

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can sort the data with by another specific column', async () => {
        setDocumentInnerHtml({ sortBy: 'lastName' });

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can sort the data with by a specific column in a specific order', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName', sortOrder: 'desc' });

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

function setDocumentInnerHtml({ sortBy, sortOrder = '' }) {

    document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-view
                        :data="[{ id: 1, firstName: 'Jay', lastName: 'Vleugels' },
                                { id: 2, firstName: 'Wesley', lastName: 'Biets' },
                                { id: 3, firstName: 'Randy', lastName: 'Paret' },
                                { id: 4, firstName: 'Devon', lastName: 'Macharis' }]"
                        sort-by="${sortBy}"
                        sort-order="${sortOrder}"
                    >
                        <table-column for="firstName" label="First name"></table-column>
                        <table-column for="lastName" label="Last name"></table-column>
                    </table-view>
                </div>
            </div>
        `;
}

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});
}
