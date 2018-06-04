import TableComponent from '../src';
import { mount } from '@vue/test-utils';

it('renders a label', () => {
    const wrapper = mount(TableComponent, {
        propsData: {
            columns: [{ name: 'firstName', label: 'First name' }],
            data: [],
        },
    });

    expect(wrapper.html()).toContain('<th>First name</th>');
});

it('renders a generic th scoped slot', () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'firstName', label: 'First name' }]"
                :data="[]"
            >
                <template slot="th" slot-scope="{ column }">
                    <th class="label">{{ column.label }}</th>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    });

    expect(wrapper.html()).toContain('<th class="label">First name</th>');
});

it('renders a named th scoped slot', () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'firstName', label: 'First name' }]"
                :data="[]"
            >
                <template slot="th" slot-scope="{ column }">
                    <th class="label">{{ column.label }}</th>
                </template>
                <template slot="th.firstName" slot-scope="{ column }">
                    <th class="first-name">{{ column.label }}</th>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    });

    expect(wrapper.html()).toContain('<tr><th class="label">First name</th></tr>');
});
