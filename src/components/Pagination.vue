<template>
    <nav v-if="shouldShowPagination">
        <ul class="pagination justify-content-center">
            <li :class="{ 'disabled': pagination.currentPage === 1 }">
                <a href="javascript:;" aria-label="First" @click="pageClicked(1)">
                    <span aria-hidden="true" v-html="first"></span>
                </a>
            </li>
            <li :class="{ 'disabled': pagination.currentPage === 1 }">
                <a href="javascript:;" aria-label="Previous" @click="pageClicked(pagination.currentPage - 1)">
                    <span aria-hidden="true" v-html="previous"></span>
                </a>
            </li>
            <li
                    v-for="page in pagesLeft"
                    class="page-item"
                    :class="{ 'active': pagination.currentPage === page }"
            >
                <a href="javascript:;" @click="pageClicked(page)">{{ page }}</a>
            </li>

            <li
                    v-if="pagination.lastPage > 10 && pagesMiddle && pagesMiddle.length"
                    class="page-item"
            >
                <a>...</a>
            </li>
            <li
                    v-if="pagination.lastPage > 10 && pagesMiddle && pagesMiddle.length"
                    v-for="page in pagesMiddle"
                    class="page-item"
                    :class="{ 'active': pagination.currentPage === page }"
            >
                <a href="javascript:;" @click="pageClicked(page)">{{ page }}</a>
            </li>
            <li
                    v-if="pagination.lastPage > 10 && pagesMiddle && pagesMiddle.length"
                    class="page-item"
            >
                <a>...</a>
            </li>

            <li
                    v-if="pagination.lastPage > 10 && !pagesMiddle"
                    class="page-item"
            >
                <a>...</a>
            </li>

            <li
                    v-if="pagesRight.length"
                    v-for="page in pagesRight"
                    class="page-item"
                    :class="{ 'active': pagination.currentPage === page }"
            >
                <a href="javascript:;" @click="pageClicked(page)">{{ page }}</a>
            </li>
            <li :class="{ 'disabled': pagination.currentPage === pagination.lastPage }">
                <a href="javascript:;" aria-label="Next" @click="pageClicked(pagination.currentPage + 1)">
                    <span aria-hidden="true" v-html="next"></span>
                </a>
            </li>
            <li :class="{ 'disabled': pagination.currentPage === pagination.lastPage }">
                <a href="javascript:;" aria-label="Last" @click="pageClicked(pagination.lastPage)">
                    <span aria-hidden="true" v-html="last"></span>
                </a>
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

        data(){
            return {
                pagesLeft: [],
                pagesMiddle: [],
                pagesRight: [],
                next: '&raquo;',
                last: '&raquo;&raquo;',
                previous: '&laquo;',
                first: '&laquo;&laquo;',
            }
        },

        computed: {
            shouldShowPagination() {
                if (this.pagination.lastPage === undefined) {
                    return false;
                }

                this.pages(this.pagination.currentPage);

                return this.pagination.perPage < this.pagination.total;
            },
        },

        methods: {
            isActive(page) {
                const currentPage = this.pagination.currentPage || 1;

                return currentPage === page;
            },
            pages(page) {
                if(this.pagination.lastPage + 1 <= 10) {
                    this.pagesLeft = range(1, this.pagination.lastPage + 1);
                    this.pagesRight = [];
                    this.pagesMiddle = null;
                }
                else if(page <= 6){
                    this.pagesLeft = range(1, 8);
                    this.pagesRight = range(this.pagination.lastPage - 2, this.pagination.lastPage + 1);
                    this.pagesMiddle = null;
                }
                else if( (page > (this.pagination.lastPage - 4)) || (page  === this.pagination.lastPage + 1) ){
                    this.pagesLeft = range(1, 3);
                    this.pagesMiddle = null;
                    this.pagesRight = range(this.pagination.lastPage - 4, this.pagination.lastPage + 1);
                }
                else {
                    this.pagesLeft = range(1, 3);
                    this.pagesMiddle = range(page - 2, page + 3);
                    this.pagesRight = range(this.pagination.lastPage - 1, this.pagination.lastPage + 1);
                }
            },
            pageClicked(page) {
                if (this.pagination.currentPage === page) {
                    return;
                }

                if(page < 1 || page > this.pagination.lastPage) {
                    return;
                }

                this.$emit('pageChange', page);

                this.pages(page);
            },
        },
        watch: {
            pagination() {
                this.pages(this.pagination.currentPage);
            }
        }
    };
</script>
