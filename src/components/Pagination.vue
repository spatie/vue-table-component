<template>
    <nav v-if="shouldShowPagination" aria-label="Page navigation example" class="my-4">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ active: isActive(page) }" v-for="page in pages">
                <a class="page-link" @click="pageClicked(page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { range } from 'lodash';

export default {
    props: {
        pagination: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        pages() {
            return this.pagination.total_pages === undefined
                ? []
                : range(1, this.pagination.total_pages + 1);
        },

        shouldShowPagination() {
            if (this.pagination.total_pages === undefined) {
                return false;
            }

            if (this.pagination.count === 0) {
                return false;
            }

            return this.pagination.total_pages > 1;
        },
    },

    methods: {
        isActive(page) {
            const currentPage = this.pagination.current_page || 1;

            return currentPage === page;
        },

        pageClicked(page) {
            if (this.pagination.current_page === page) {
                return;
            }

            this.$emit('choosePage', page);
        },
    },
};
</script>
