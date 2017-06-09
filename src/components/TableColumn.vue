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
            filterable: { default: true, type: Boolean },
            sortable: { default: true, type: Boolean },
        },
    };
</script>
