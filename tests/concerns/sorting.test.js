import simulant from 'simulant';
import createVm from '../createVm';

function setDocumentInnerHtml({ sortBy, sortOrder }) {
    document.body.innerHTML = `
        <div id="app">
            <table-component
                :data="[{ firstName: 'John', lastName: 'Lennon', songs: 72 },
                        { firstName: 'Paul', lastName: 'McCartney', songs: 70 },
                        { firstName: 'George', lastName: 'Harrison', songs: 22 },
                        { firstName: 'Ringo', lastName: 'Starr', songs: 2 }]"
                sort-by="${sortBy}"
                sort-order="${sortOrder}"
            >
                <table-column show="firstName" label="First name"></table-column>
                <table-column show="lastName" label="Last name"></table-column>
                <table-column show="songs" label="Songs" :sortable="false"></table-column>
            </table-component>
        </div>
    `;
}

describe('Sorting', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('can sort the data by a column', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName', sortOrder: 'asc' });

        const table = await createVm();

        expect(table.displayedRows[0].data.firstName).toBe('George');
        expect(table.displayedRows[1].data.firstName).toBe('John');
        expect(table.displayedRows[2].data.firstName).toBe('Paul');
        expect(table.displayedRows[3].data.firstName).toBe('Ringo');
    });

    it('can sort the data with by a column in a different order', async () => {
        setDocumentInnerHtml({ sortBy: 'songs', sortOrder: 'desc' });

        const table = await createVm();

        expect(table.displayedRows[0].data.firstName).toBe('John');
        expect(table.displayedRows[1].data.firstName).toBe('Paul');
        expect(table.displayedRows[2].data.firstName).toBe('George');
        expect(table.displayedRows[3].data.firstName).toBe('Ringo');
    });

    it('it will change the sort order when clicking the header of the column with the active sort', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName', sortOrder: 'asc' });

        const table = await createVm();

        const firstNameColumnHeader = document.getElementsByTagName('th')[0];
        await simulant.fire(firstNameColumnHeader, 'click');

        expect(table.sort.order).toBe('desc');
    });

    it('will sort the data ascending if the header of of column without the active sort is clicked', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName', sortOrder: 'desc' });

        const table = await createVm();

        const lastNameColumnHeader = document.getElementsByTagName('th')[1];
        await simulant.fire(lastNameColumnHeader, 'click');

        expect(table.sort.fieldName).toBe('lastName');
        expect(table.sort.order).toBe('asc');
    });

    it('will not sort data when clicking a non-sortable column header', async () => {
        setDocumentInnerHtml({ sortBy: 'firstName', order: 'asc' });

        const table = await createVm();

        const songsColumnHeader = document.getElementsByTagName('th')[2];
        await simulant.fire(songsColumnHeader, 'click');

        expect(table.sort.fieldName).toBe('firstName');
    });

    it('wont break if a sortable column has no data', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John', songs: 30 },
                            { firstName: 'Paul', songs: 20 },
                            { firstName: 'George', songs: 420 },
                            { firstName: 'Ringo', songs: 210 }]"
                >
                    <table-column show="firstName" label="First name" sort-by="songs"></table-column>
                    <table-column show="lastName" label="Last name"></table-column>
                    <table-column show="songs" data-type="numeric" label="Songs" sort-by="songs"></table-column>
                </table-component>
            </div>
        `;

        const table = await createVm();

        const lastNameColumnHeader = document.getElementsByTagName('th')[1];
        await simulant.fire(lastNameColumnHeader, 'click');

        expect(table.sort.fieldName).toBe('lastName');
    });
});
