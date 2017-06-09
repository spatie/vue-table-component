<template>
    <th>
        {{ label }}
    </th>
</template>

<script>
    export default {
        props: {
            show: { required: true, type: String },
            label: { default: '', type: String },
            dataType: { default: 'string', type: String },

            sortable: { default: true, type: Boolean },
            sortOn: { default: null },

            filterable: { default: true, type: Boolean },
            filterOn: { default: null },
        },
    };
</script>
