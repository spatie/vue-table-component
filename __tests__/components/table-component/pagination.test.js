import Pagination from '../../../src';
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
                    current_page: 1,
                    total_pages: 1,
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
                    current_page: 1,
                    total_pages: 3,
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
                    current_page: 2,
                    total_pages: 3,
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
