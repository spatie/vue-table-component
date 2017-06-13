<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            show: { required: true, type: String },
            label: { default: '', type: String },
            dataType: { default: 'string', type: String },

            sortable: { default: true, type: Boolean },
            sortBy: { default: null },

            filterable: { default: true, type: Boolean },
            filterOn: { default: null },
        },
    };
</script>
