import TableComponent from '../../../src';
import Vue from 'vue/dist/vue.js';

describe('TableComponent', () => {
    Vue.use(TableComponent);

    it('can mount', async () => {
        document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ id: 1, firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column for="firstName" label="First name"></table-column>
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
                    :data="[{ id: 1, firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column for="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

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
