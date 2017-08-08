<template>
    <th
        @click="clicked"
        :class="headerClass"
        role="columnheader"
        scope="col"
        :aria-sort="ariaSort"
        :aria-disabled="ariaDisabled"
        v-if="this.isVisible"
    >
        {{ label }}
    </th>
</template>

<script>
    export default {
        props: ['column', 'sort'],

        computed: {
            ariaDisabled() {
                if (! this.column.isSortable()) {
                    return 'true';
                }

                return false;
            },

            ariaSort() {
                if (! this.column.isSortable()) {
                    return false;
                }

                if (this.column.properties.show !== this.sort.fieldName) {
                    return 'none';
                }

                return this.sort.order === 'asc' ? 'ascending' : 'descending';
            },

            headerClass() {
                if (! this.column.isSortable()) {
                    return this.column.properties.headerClass;
                }

                let userHeaderClass = this.column.properties.headerClass ? ' '+this.column.properties.headerClass : '';

                if (this.column.properties.show !== this.sort.fieldName) {
                    return 'table-component__th--sort'+userHeaderClass;
                }

                return `table-component__th--sort-${this.sort.order}`+userHeaderClass;
            },

            isVisible() {
                return ! this.column.properties.hidden;
            },

            label() {
                if (this.column.properties.label === null) {
                    return this.column.properties.show;
                }

                return this.column.properties.label;
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
