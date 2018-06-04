import TableComponent from '../src';
import { mount } from '@vue/test-utils';

it('renders rows from a data array', () => {
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

    expect(wrapper.findAll('tbody > tr').length).toBe(4);
    expect(wrapper.html()).toContain('John');
    expect(wrapper.html()).toContain('Paul');
    expect(wrapper.html()).toContain('George');
    expect(wrapper.html()).toContain('Ringo');
});
