import { get } from 'lodash';

export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {
        const contents = props.column.properties.template
            ? props.column.properties.template(props.row)
            : props.column.properties.formatter(get(props.row, props.column.properties.show));

        return createElement('td', contents);
    },
};
