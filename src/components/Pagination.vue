<template>
    <nav v-if="shouldShowPagination">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ active: isActive(page), disabled: page === '...' }" v-for="page in pages">
                <a class="page-link" @click="pageClicked(page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>

    export default {
        props: {
            pagination: {
                type: Object,
                default: () => ({}),
            },
        },

        computed: {
            pages() {
                if (this.pagination.totalPages === undefined) {
                    return [];
                }

                const pages = [];
                let preDots = false;
                let postDots = false;

                for (let i = 1; i <= this.pagination.totalPages; i++) {
                    if (this.pagination.totalPages <= 10) {
                        pages.push(i);
                    } else {
                        if (i === 1) {
                            pages.push(i);
                        } else if (i === this.pagination.totalPages) {
                            pages.push(i);
                        } else if (
                            // link is within 4 of current
                        (i > this.pagination.currentPage - 4 && i < this.pagination.currentPage + 4) ||
                        // current and link less than 4
                        (i < 4 && this.pagination.currentPage < 4) ||
                        // current and link within 4 of end
                        (i > this.pagination.totalPages - 4 && this.pagination.currentPage > this.pagination.totalPages - 4)) {
                            pages.push(i);
                        } else if (i < this.pagination.currentPage && !preDots) {
                            pages.push('...');
                            preDots = true;
                        } else if (i > this.pagination.currentPage && !postDots) {
                            pages.push('...');
                            postDots = true;
                        }
                    }
                }

                return pages;
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
                if (page === '...' ||
                    page === this.pagination.currentPage ||
                    page > this.pagination.totalPages ||
                    page < 1) {
                    return;
                }

                this.$emit('pageChange', page);
            },
        },
    };
</script>
