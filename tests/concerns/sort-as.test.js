import createVm from '../createVm';

function setDocumentInnerHtml({ sortBy, sortOrder }) {
    document.body.innerHTML = `
        <div id="app">
            <table-component
                :data="[{ firstName: 'John', lastName: 'Lennon', songs: '72,000', songsRaw: 72000 },
                        { firstName: 'George', lastName: 'Harrison', songs: '2,000', songsRaw: 2000 },
                        { firstName: 'Paul', lastName: 'McCartney', songs: '50,000', songsRaw: 50000 },
                        { firstName: 'Ringo', lastName: 'Starr', songs: '20', songsRaw: 20 }]"
                sort-by="${sortBy}"
                sort-order="${sortOrder}"
            >
                <table-column show="firstName" label="First name"></table-column>
                <table-column show="lastName" label="Last name"></table-column>
                <table-column show="songs" label="Songs" sort-as="songsRaw"></table-column>
            </table-component>
        </div>
    `;
}

describe('Sort As', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('can sort the data by an alternative value using sort-as', async () => {
        setDocumentInnerHtml({ sortBy: 'songs', sortOrder: 'desc' });

        const table = await createVm();

        expect(table.displayedRows[0].data.firstName).toBe('John');
        expect(table.displayedRows[1].data.firstName).toBe('Paul');
        expect(table.displayedRows[2].data.firstName).toBe('George');
        expect(table.displayedRows[3].data.firstName).toBe('Ringo');
    });
});
