import createVm from '../createVm';

describe('Filtering', () => {
    beforeEach(() => {
        window.localStorage.clear();

        document.body.innerHTML = `
            <div id="app">
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
        `;
    });

    it('can filter data', async () => {
        const table = await createVm(table => {
            table.filter = 'Paul';
        });

        expect(table.displayedRows).toHaveLength(1);
        expect(table.displayedRows[0].data.firstName).toBe('Paul');
    });

    it('can filter data in a case-insensitive way', async () => {
        const table = await createVm(table => {
            table.filter = 'paul';
        });

        expect(table.displayedRows).toHaveLength(1);
        expect(table.displayedRows[0].data.firstName).toBe('Paul');
    });

    it('will display a message if there are no matching rows', async () => {
        const table = await createVm(table => {
            table.filter = 'there are no rows that will match this';
        });

        expect(table.displayedRows).toHaveLength(0);
    });

    it('will not use columns that are not filterable', async () => {
        // Note: Only the firstName field is filterable
        // <table-column show="lastName" label="Last name" :filterable="false"></table-column>

        const table = await createVm(table => {
            table.filter = 'Lennon';
        });

        expect(table.displayedRows).toHaveLength(0);
    });

    it('can filter on another property', async () => {
        document.body.innerHTML = `
            <div id="app">
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
        `;

        const table = await createVm(table => {
            table.filter = '70';
        });

        expect(table.displayedRows).toHaveLength(1);
        expect(table.displayedRows[0].data.firstName).toBe('Paul');
    });

    it('can add a custom html class on the filter input', async () => {
        document.body.innerHTML = `
            <div id="app">
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
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('hides the filter when no columns are filterable', async () => {
        document.body.innerHTML = `
            <div id="app">
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
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});
