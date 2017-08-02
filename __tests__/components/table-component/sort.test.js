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

    it('will sort the data ascendingly if the header of of column without the active sort is clicked', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName' });

        await createVm();

        const secondColumnHeader = document.getElementsByTagName('th')[1];

        await simulant.fire(secondColumnHeader, 'click');

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will not sort on a column that is not sortable', async () => {
        setDocumentInnerHtml({ sortBy: 'songs', order: 'desc' });

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

    it('can sort on another column', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
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

        const firstColumnHeader = document.getElementsByTagName('th')[0];

        await simulant.fire(firstColumnHeader, 'click');

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will not sort rows in the footer', async () => {
        document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ firstName: 'John', songs: 30 },
                                { firstName: 'Paul', songs: 20 },
                                { firstName: 'George', songs: 420 },
                                { firstName: 'Ringo', songs: 210 },
                                { firstName: 'Total Songs', songs: 680, isFooterRow: true }]"
                    >
                        <table-column show="firstName" label="First name" sort-by="songs"></table-column>
                        <table-column show="songs" data-type="numeric" label="Songs" sort-by="songs"></table-column>
                    </table-component>
                </div>
            </div>
        `;

        const table = await createVm();

        const firstColumnHeader = table.$el.getElementsByTagName('th')[0];

        await simulant.fire(firstColumnHeader, 'click');

        const body = table.$el.getElementsByTagName('tbody')[0];
        const footer = table.$el.getElementsByTagName('tfoot')[0];

        const bodyRows = body.getElementsByTagName('tr');
        const searchText = 'Total Songs';

        for (let i = 0; i < bodyRows.length; i++) {
            expect(findCellByText(bodyRows[i], searchText)).toBeFalsy();
        }

        expect(findCellByText(footer.children[0], searchText)).toBeTruthy();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

function setDocumentInnerHtml({ sortBy = '', order = '' } = {}) {
    document.body.innerHTML = `
            <div id="app">
                <div>
                    <table-component
                        :data="[{ firstName: 'John', lastName: 'Lennon', songs: 72 },
                                { firstName: 'Paul', lastName: 'McCartney', songs: 70 },
                                { firstName: 'George', lastName: 'Harrison', songs: 22 },
                                { firstName: 'Ringo', lastName: 'Starr', songs: 2 }]"
                        sort-by="${sortBy}"
                        sort-order="${order}"
                    >
                        <table-column show="firstName" label="First name"></table-column>
                        <table-column show="lastName" label="Last name"></table-column>
                        <table-column show="songs" label="Songs" :sortable="false"></table-column>
                    </table-component>
                </div>
            </div>
        `;
}

function findCellByText(tableRow, text) {
    const tableRowArray = Array.from(tableRow.children);

    return tableRowArray.find(cell => {
        return cell.textContent === text;
    });
}

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    const table = vm.$children[0];

    return table;
}
