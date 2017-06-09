import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';

describe('TableComponent', () => {
    Vue.use(TableComponent);

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ id: 1, firstName: 'John', lastName: 'Lennon' },
                            { id: 2, firstName: 'Paul', lastName: 'McCartney' },
                            { id: 3, firstName: 'George', lastName: 'Harrison' },
                            { id: 4, firstName: 'Ringo', lastName: 'Starr' }]"
                    sort-by="lastName"
                    sort-order="desc"
                >
                    <table-column for="firstName" label="First name"></table-column>
                    <table-column for="lastName" label="Last name"></table-column>
                </table-component>
            </div>
        `;
    });

    it('can mount', async () => {
        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    return { app: vm, component: vm.$children[0] };
}
