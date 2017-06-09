<template>
    <th @click="clicked" :class="headerClass">
        {{ label }}
    </th>
</template>

<script>
    export default {
        props: ['column', 'sort'],

        computed: {
            headerClass() {
                if (! this.column.isSortable()) {
                    return;
                }

                if (this.column.properties.show !== this.sort.fieldName) {
                    return 'table-component__th--sort';
                }

                return `table-component__th--sort-${this.sort.order}`;
            },

            label() {
                return this.column.properties.label || this.column.properties.show;
            },
        },

        methods: {
            clicked() {
                if (this.column.isSortable()) {
                    this.$emit('click', this.column);
                }
            },
        },
    };
</script>
