import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';
import simulant from 'simulant';
import LocalStorageMock from '../../helpers/LocalStorageMock';

const localStorage = new LocalStorageMock();

window.localStorage = localStorage;

describe('Sortable tableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
        localStorage.clear();
    });

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
        setDocumentInnerHtml({ sortBy: 'firstName', order: 'desc' });

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('it will change the sort order when clicking the header of the column with the active sort', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName' });

        await createVm();

        const firstColumnHeader = document.getElementsByTagName('th')[0];

        await simulant.fire(firstColumnHeader, 'click');

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will sort the data descendingly if the header of of column without the active sort is clicked', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName' });

        await createVm();

        const secondColumnHeader = document.getElementsByTagName('th')[1];

        await simulant.fire(secondColumnHeader, 'click');

        expect(document.body.innerHTML).toMatchSnapshot();
    });
    
    it('will not sort on a column that is not sortable', async () => {
        setDocumentInnerHtml({ sortBy: 'actions', order: 'desc' });

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will not sort data when clicking a non-sortable column header', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName' });

        await createVm();

        const thirdColumnHeader = document.getElementsByTagName('th')[2];

        await simulant.fire(thirdColumnHeader, 'click');

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

function setDocumentInnerHtml({ sortBy = '', order = '' } = {}) {

    document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ id: 1, firstName: 'John', lastName: 'Lennon', actions: 'Red' },
                                { id: 2, firstName: 'Paul', lastName: 'McCartney', actions: 'Blue' },
                                { id: 3, firstName: 'George', lastName: 'Harrison', actions: 'Green' },
                                { id: 4, firstName: 'Ringo', lastName: 'Starr', actions: 'Yellow' }]"
                        sort-by="${sortBy}"
                        sort-order="${order}"
                    >
                        <table-column show="firstName" label="First name"></table-column>
                        <table-column show="lastName" label="Last name"></table-column>
                        <table-column show="actions" label="Color" :sortable="false"></table-column>
                    </table-component>
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
