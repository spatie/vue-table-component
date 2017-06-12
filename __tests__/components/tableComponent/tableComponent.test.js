import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';
import LocalStorageMock from '../../helpers/LocalStorageMock';

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

    it('has props to set classes on the table and the rows', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    table-class="extra-table-class"
                    row-class="extra-row-class"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can display a custom text as the filter placeholder', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :texts="{filterPlaceholder: 'custom placeholder'}"
                    table-class="extra-table-class"
                    row-class="extra-row-class"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can display a custom text when the filter returns no results', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :texts="{ filterResultEmpty: 'game over man, game over'}"
                    table-class="extra-table-class"
                    row-class="extra-row-class"
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
});

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    const table = vm.$children[0];

    return table;
}
