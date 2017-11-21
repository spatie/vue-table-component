<template>
    <nav v-if="shouldShowPagination">
        <ul class="pagination justify-content-center">
            <li :class="{ disabled: pagination.currentPage === 1 }">
                <a
                    :class="{ disabled: pagination.currentPage === 1 }"
                    @click="pageClicked( pagination.currentPage - 1 )">
                    <i class="left chevron icon">«</i>
                </a>
            </li>
            <li class="page-item" :class="{ active: isActive(page), disabled: page === '...' }" v-for="page in pages">
                <a class="page-link" @click="pageClicked(page)">{{ page }}</a>
            </li>
            <li>
                <a
                    :class="{ disabled: pagination.currentPage === this.pagination.totalPages }"
                    @click="pageClicked( pagination.currentPage + 1 )">
                    <i class="right chevron icon">»</i>
                </a>
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
                return this.pagination.totalPages === undefined
                    ? []
                    : this.pageLinks();
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

            pageLinks() {
                const pages = [];
                let preDots = false;
                let postDots = false;

                for (let i = 1; i <= this.pagination.totalPages; i++) {

                    if (this.pagination.totalPages <= 10) {
                        pages.push(i);
                    } else {
                        if (i === 1) {
                            pages.push(i);
                            continue;
                        }

                        if (i === this.pagination.totalPages) {
                            pages.push(i);
                            continue;
                        }

                        if (
                            // link is within 4 of current
                        (i > this.pagination.currentPage - 4 && i < this.pagination.currentPage + 4) ||
                        // current and link less than 4
                        (i < 4 && this.pagination.currentPage < 4) ||
                        // current and link within 4 of end
                        (i > this.pagination.totalPages - 4 && this.pagination.currentPage > this.pagination.totalPages - 4)) {
                            pages.push(i);
                            continue;
                        }

                        if (i < this.pagination.currentPage && !preDots) {
                            pages.push('...');
                            preDots = true;
                            continue;
                        }

                        if (i > this.pagination.currentPage && !postDots) {
                            pages.push('...');
                            postDots = true;
                        }
                    }
                }

                return pages;
            },
        },
    };
</script>
