<template>
    <th @click="clicked">
        {{ column.properties.label }}
    </th>
</template>

<script>
    export default {
        props: ['column'],

        methods: {
            clicked(event) {
                if (this.column.isSortable()) {
                    this.$emit('click', this.column);
                }

            }
        }
    };
</script>
