<template>
    <th @click="clicked" :class="headerClass">
        {{ column.properties.label }}
    </th>
</template>

<script>
    export default {
        props: ['column', 'sort'],

        computed: {
            headerClass() {
                if(! this.column.isSortable()) {
                    return;
                }

                if (this.column.properties.for !== this.sort.fieldName) {
                    return;
                }

                return `sort-${this.sort.order}`;
            }
        },

        methods: {
            clicked(event) {
                if (this.column.isSortable()) {
                    this.$emit('click', this.column);
                }
            },
        },
    };
</script>
