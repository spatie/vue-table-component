import get from 'lodash/get';

export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {
        const contents = props.column.template
            ? props.column.template(props.row)
            : props.column.formatter(get(props.row, props.column.show));

        return createElement('td', contents);
    },
};
