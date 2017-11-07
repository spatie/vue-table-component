import Pagination from '../../src';
import Vue from 'vue/dist/vue.js';

describe('Pagination', () => {
    Vue.use(Pagination);

    it('can mount without pagination data', async () => {
        document.body.innerHTML = `
            <div id="app">
                <pagination></pagination>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will not display when there is only one page', async () => {

        document.body.innerHTML = `
            <div id="app">
                <pagination
                :pagination="{
                    currentPage: 1,
                    totalPages: 1,
                }">

                </pagination>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('will render links when there is more than one page', async () => {

        document.body.innerHTML = `
            <div id="app">
                <pagination
                :pagination="{
                    currentPage: 1,
                    totalPages: 3,
                }">

                </pagination>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can set the active page', async () => {

        document.body.innerHTML = `
            <div id="app">
                <pagination
                :pagination="{
                    currentPage: 2,
                    totalPages: 3,
                }">

                </pagination>
            </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can render large pagination', async () => {

        document.body.innerHTML = `
            <div id="app">
                <pagination
                :pagination="{
                    currentPage: 2,
                    totalPages: 100,
                }">

                </pagination>
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

    await Vue.nextTick(() => {
    });

    const table = vm.$children[0];

    return table;
}
