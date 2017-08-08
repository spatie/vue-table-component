export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {
        const data = props.column.cellClass
            ? { class: props.column.cellClass }
            : {};

        if (props.column.template) {
            return createElement('td', data, props.column.template(props.row.data));
        }

        const innerHTML = props.column.formatter(props.row.getValue(props.column.show));

        return createElement('td', { ...data, domProps: { innerHTML } });
    },
};
