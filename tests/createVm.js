import Vue from 'vue/dist/vue.js';

export default async function createVm(callback = null) {
    const vm = new Vue({ el: '#app' });

    await Vue.nextTick();

    const table = vm.$children[0];

    if (callback) {
        callback(table);

        await Vue.nextTick();
    }

    return table;
}
