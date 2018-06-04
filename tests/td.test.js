import TableComponent from '../src';
import { mount } from '@vue/test-utils';

it('renders a property', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'firstName', label: 'First name' }],
            data: [
                { firstName: 'John' },
                { firstName: 'Paul' },
                { firstName: 'George' },
                { firstName: 'Ringo' },
            ],
        },
    });

    expect(wrapper.html()).toContain('<td>John</td>');
    expect(wrapper.html()).toContain('<td>Paul</td>');
    expect(wrapper.html()).toContain('<td>George</td>');
    expect(wrapper.html()).toContain('<td>Ringo</td>');
});

it('renders a nested property with a string accessor', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'name', accessor: 'name.first', label: 'First name' }],
            data: [
                { name: { first: 'John' } },
                { name: { first: 'Paul' } },
                { name: { first: 'George' } },
                { name: { first: 'Ringo' } },
            ],
        },
    });

    expect(wrapper.html()).toContain('<td>John</td>');
    expect(wrapper.html()).toContain('<td>Paul</td>');
    expect(wrapper.html()).toContain('<td>George</td>');
    expect(wrapper.html()).toContain('<td>Ringo</td>');
});

it('renders a nested property with a function accessor', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'name', accessor: row => row.name.first, label: 'First name' }],
            data: [
                { name: { first: 'John' } },
                { name: { first: 'Paul' } },
                { name: { first: 'George' } },
                { name: { first: 'Ringo' } },
            ],
        },
    });

    expect(wrapper.html()).toContain('<td>John</td>');
    expect(wrapper.html()).toContain('<td>Paul</td>');
    expect(wrapper.html()).toContain('<td>George</td>');
    expect(wrapper.html()).toContain('<td>Ringo</td>');
});

it('renders a generic td scoped slot', () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'name', label: 'First name' }]"
                :data="[
                    { firstName: 'John' },
                    { firstName: 'Paul' },
                    { firstName: 'George' },
                    { firstName: 'Ringo' },
                ]"
            >
                <template slot="td" slot-scope="{ row }">
                    <td class="first-name">{{ row.firstName }}</td>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    });

    expect(wrapper.html()).toContain('<td class="first-name">John</td>');
    expect(wrapper.html()).toContain('<td class="first-name">Paul</td>');
    expect(wrapper.html()).toContain('<td class="first-name">George</td>');
    expect(wrapper.html()).toContain('<td class="first-name">Ringo</td>');
});

it('renders a named scoped td slot', () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'name', label: 'First name' }]"
                :data="[
                    { firstName: 'John' },
                    { firstName: 'Paul' },
                    { firstName: 'George' },
                    { firstName: 'Ringo' },
                ]"
            >
                <template slot="td" slot-scope="{ row, column }">
                    <td class="default">{{ row[column.name] }}</td>
                </template>
                <template slot="td" slot-scope="{ row }">
                    <td class="first-name">{{ row.firstName }}</td>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    });

    expect(wrapper.html()).toContain('<td class="first-name">John</td>');
    expect(wrapper.html()).toContain('<td class="first-name">Paul</td>');
    expect(wrapper.html()).toContain('<td class="first-name">George</td>');
    expect(wrapper.html()).toContain('<td class="first-name">Ringo</td>');
});
