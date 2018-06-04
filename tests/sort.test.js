import Vue from 'vue';
import TableComponent from '../src';
import { mount } from '@vue/test-utils';

it('sorts data by a column', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'firstName', label: 'First name' }],
            data: [
                { firstName: 'John' },
                { firstName: 'Paul' },
                { firstName: 'George' },
                { firstName: 'Ringo' },
            ],
            sortBy: 'firstName',
        },
    });

    const rows = wrapper.findAll('tbody > tr');
    expect(rows.at(0).html()).toBe('<tr><td>George</td></tr>');
    expect(rows.at(1).html()).toBe('<tr><td>John</td></tr>');
    expect(rows.at(2).html()).toBe('<tr><td>Paul</td></tr>');
    expect(rows.at(3).html()).toBe('<tr><td>Ringo</td></tr>');
});

it('sorts data by a column in an order', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'firstName', label: 'First name' }],
            data: [
                { firstName: 'John' },
                { firstName: 'Paul' },
                { firstName: 'George' },
                { firstName: 'Ringo' },
            ],
            sortBy: 'firstName',
            sortOrder: 'desc',
        },
    });

    const rows = wrapper.findAll('tbody > tr');
    expect(rows.at(0).html()).toBe('<tr><td>Ringo</td></tr>');
    expect(rows.at(1).html()).toBe('<tr><td>Paul</td></tr>');
    expect(rows.at(2).html()).toBe('<tr><td>John</td></tr>');
    expect(rows.at(3).html()).toBe('<tr><td>George</td></tr>');
});

it('toggles sort order on header click', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'firstName', label: 'First name' }],
            data: [
                { firstName: 'John' },
                { firstName: 'Paul' },
                { firstName: 'George' },
                { firstName: 'Ringo' },
            ],
            sortBy: 'firstName',
        },
    });

    wrapper.find('th').trigger('click');

    const rows = wrapper.findAll('tbody > tr');
    expect(rows.at(0).html()).toBe('<tr><td>Ringo</td></tr>');
    expect(rows.at(1).html()).toBe('<tr><td>Paul</td></tr>');
    expect(rows.at(2).html()).toBe('<tr><td>John</td></tr>');
    expect(rows.at(3).html()).toBe('<tr><td>George</td></tr>');
});

it('toggles sort order on click with a custom thead', async () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'firstName', label: 'First name' }]"
                :data="[
                    { firstName: 'John' },
                    { firstName: 'Paul' },
                    { firstName: 'George' },
                    { firstName: 'Ringo' },
                ]"
            >
                <template slot="thead" slot-scope="{ columns }">
                    <thead>
                        <tr>
                            <th v-for="column in columns" :key="column.name">
                                {{ column.name }}
                                <span class="sort-handle" @click="column.toggleSort">Sort</span>
                            </th>
                        </tr>
                    </thead>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    }, { sync: false });

    wrapper.find('.sort-handle').trigger('click');

    await Vue.nextTick();

    const rows = wrapper.findAll('tbody > tr');
    expect(rows.at(0).html()).toBe('<tr><td>George</td></tr>');
    expect(rows.at(1).html()).toBe('<tr><td>John</td></tr>');
    expect(rows.at(2).html()).toBe('<tr><td>Paul</td></tr>');
    expect(rows.at(3).html()).toBe('<tr><td>Ringo</td></tr>');

    wrapper.find('.sort-handle').trigger('click');

    await Vue.nextTick();

    expect(rows.at(0).html()).toBe('<tr><td>Ringo</td></tr>');
    expect(rows.at(1).html()).toBe('<tr><td>Paul</td></tr>');
    expect(rows.at(2).html()).toBe('<tr><td>John</td></tr>');
    expect(rows.at(3).html()).toBe('<tr><td>George</td></tr>');
});
