import TableComponent from '../src';
import { mount } from '@vue/test-utils';

it('renders a thead scoped slot', () => {
    const wrapper = mount({
        template: `
            <table-component
                :columns="[{ name: 'firstName', label: 'First name' }]"
                :data="[]"
            >
                <template slot="thead" slot-scope="{ columns }">
                    <thead>
                        <tr>
                            <th v-for="(column, name) in columns" :key="name">{{ column.label }}</th>
                        </tr>
                    </thead>
                </template>
            </table-component>
        `,
        components: {
            TableComponent,
        },
    });

    expect(wrapper.html()).toContain('<th>First name</th>');
});
