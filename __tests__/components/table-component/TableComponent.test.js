import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';
import LocalStorageMock from '../../helpers/LocalStorageMock';
import simulant from 'simulant';

const localStorage = new LocalStorageMock();

window.localStorage = localStorage;

describe('TableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
        localStorage.clear();
    });

    it('can mount', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John' },{ firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('has an prop to disable the filter', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('has an prop to disable the caption', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component :show-caption="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will use the property name as a column heading if label is not set', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('won\'t use the property name as a column heading if label is an empty string', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label=""></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can display a custom message when filtering results in no results', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :extra-settings="{ labels: { filterResultEmpty: 'game over man, game over' } }"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        const table = await createVm();

        table.filter = 'this returns nothing';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can display a custom placeholder in the filter field', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :extra-settings="{ labels: { filterPlaceholder: 'custom placeholder' } }"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        const table = await createVm();

        table.filter = 'this returns nothing';

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can accept a function to fetch the data', async () => {
        const serverResponse = () => {
            return {
                data: [{ firstName: 'John' },{ id: 2, firstName: 'Paul' }],
            };
        };

        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="${serverResponse}">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can render pagination when the server responds with pagination data', async () => {
        const serverResponse = () => {
            return {
                data: [{ firstName: 'John' },{ id: 2, firstName: 'Paul' }],
                pagination: {
                    totalPages: 4,
                    currentPage: 2,
                },
            };
        };

        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="${serverResponse}">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('clicking a link in the pagination will rerender the table', async () => {
        const serverResponse = ({ page }) => {
            return {
                data: [{ firstName: `John ${page}` },{ id: 2, firstName: `Paul ${page}` }],
                pagination: {
                    totalPages: 4,
                    currentPage: page,
                },
            };
        };

        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="${serverResponse}">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        await Vue.nextTick(() => {});

        expect(document.body.innerHTML).toMatchSnapshot();

        const thirdPageLink = document.getElementsByClassName('page-link')[2];

        await simulant.fire(thirdPageLink, 'click');

        await Vue.nextTick();
        await Vue.nextTick();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can render a set of footer rows', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component :show-caption="false"
                    :data="[
                        { firstName: 'John', numSkills: 2 },
                        { id: 2, firstName: 'Paul', numSkills: 3 },
                        { firstName: 'Total Skills', numSkills: 5, isFooterRow: true }]"
                >
                    <table-column show="firstName" label="First name"></table-column>
                    <table-column show="numSkills" label="Number of skills" data-type="numeric"></table-column>
                </table-component>
            </div>
        `;

        const table = await createVm();

        const footer = table.$el.getElementsByTagName('tfoot')[0];

        expect(footer).toBeTruthy();
        expect(footer.tagName).toEqual('TFOOT');
        expect(footer.children[0].tagName).toEqual('TR');

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
