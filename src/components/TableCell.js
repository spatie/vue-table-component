export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {
        const contents = props.column.template
            ? props.column.template(props.row.data)
            : props.column.formatter(props.row.getValue(props.column.show));

        return createElement('td', props.column.cellClass ? { class: props.column.cellClass } : {}, contents);
    },
};
