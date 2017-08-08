<template>
    <nav v-if="shouldShowPagination">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ active: isActive(page) }" v-for="page in pages">
                <a class="page-link" @click="pageClicked(page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import range from 'lodash/range';

    export default {
        props: {
            pagination: {
                type: Object,
                default: () => ({}),
            },
        },

        computed: {
            pages() {
                return this.pagination.totalPages === undefined
                    ? []
                    : range(1, this.pagination.totalPages + 1);
            },

            shouldShowPagination() {
                if (this.pagination.totalPages === undefined) {
                    return false;
                }

                if (this.pagination.count === 0) {
                    return false;
                }

                return this.pagination.totalPages > 1;
            },
        },

        methods: {
            isActive(page) {
                const currentPage = this.pagination.currentPage || 1;

                return currentPage === page;
            },

            pageClicked(page) {
                if (this.pagination.currentPage === page) {
                    return;
                }

                this.$emit('pageChange', page);
            },
        },
    };
</script>
