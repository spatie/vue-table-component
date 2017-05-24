<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            field: {
                type: String,
                required: false,
            },
            datatype: {
                type: String,
                required: false,
                default: 'string',
            },
            filterable: {
                type: Boolean,
                required: false,
                default: true,
            },
            sortable: {
                type: Boolean,
                required: false,
                default: true,
            },

        },
    };
</script>