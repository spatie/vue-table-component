<template>
    <div class="table-component">

        <div v-if="showFilter" class="table-component__filter">
            <input
                class="table-component__filter__field"
                type="text"
                v-model="filter"
                :placeholder="filterPlaceholder"
            >
            <a
                v-if="filter"
                @click="filter = ''"
                class="table-component__filter__clear"
            >×</a>
        </div>

        <div class="table-component__table-wrapper">
            <table :class="fullTableClass">
                <caption v-if="showCaption" class="table-component__table__caption" role="alert" aria-live="polite">
                    {{ ariaCaption }}
                </caption>
                <thead>
                <tr>
                    <table-column-header
                        @click="changeSorting"
                        v-for="column in columns"
                        :key="column.properties.show"
                        :sort="sort"
                        :column="column"
                    />
                </tr>
                </thead>
                <tbody>
                <table-row
                    v-for="row in displayedRows"
                    :key="row.vueTableComponentInternalRowId"
                    :row="row"
                    :columns="columns"
                ></table-row>
                </tbody>
            </table>
        </div>

        <div v-if="displayedRows.length === 0" class="table-component__message">
            {{ filterNoResults }}
        </div>


        <div style="display:none;">
            <slot></slot>
        </div>

        <pagination v-if="pagination" :pagination="pagination" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
    import Column from '../classes/Column';
    import expiringStorage from '../expiring-storage';
    import Row from '../classes/Row';
    import TableColumnHeader from './TableColumnHeader';
    import TableRow from './TableRow';
    import { pick } from 'lodash';
    import settings from '../settings';
    import { isArray } from 'lodash';
    import Pagination from './Pagination';

    export default {
        components: {
            TableColumnHeader,
            TableRow,
            Pagination,
        },

        props: {
            data: { default: () => [], type: [Array, Function] },

            showFilter: { default: true },
            showCaption: { default: true },

            sortBy: { default: '', type: String },
            sortOrder: { default: '', type: String },

            cacheId: { default: '' },
            cacheLifetime: { default: 5 },

            tableClass: { default: settings.tableClass },
            filterPlaceholder: { default: settings.filterPlaceholder },
            filterNoResults: { default: settings.filterNoResults },
        },

        data: () => ({
            columns: [],
            rows: [],
            filter: '',
            sort: {
                fieldName: '',
                order: '',
            },
            pagination: null,

            localSettings: {},
        }),

        created() {
            this.sort.fieldName = this.sortBy;
            this.sort.order = this.sortOrder;

            this.restoreState();
        },

        async mounted() {
            this.columns = this.$slots.default
                .filter(column => column.componentInstance)
                .map(column => pick(column.componentInstance, [
                    'show', 'label', 'dataType', 'sortable', 'sortBy', 'filterable', 'filterOn', 'hidden',  'formatter',
                ]))
                .map(columnProperties => new Column(columnProperties));

            await this.mapDataToRows();
        },

        watch: {
            filter() {
                if (! this.usesLocalData) {
                    this.mapDataToRows();
                }

                this.saveState();
            },

            data() {
                if (this.usesLocalData) {
                    this.mapDataToRows();
                }
            },
        },

        computed: {
            fullTableClass() {
                const extraClasses = isArray(this.tableClass) ?
                    this.tableClass :
                    [this.tableClass];

                return ['table-component__table', ...extraClasses];
            },

            ariaCaption() {
                if (this.sort.fieldName === '') {
                    return 'Table not sorted';
                }

                return `Table sorted by ${this.sort.fieldName} ` +
                    (this.sort.order === 'asc' ? '(ascending)' : '(descending)');
            },

            usesLocalData() {
                return isArray(this.data);
            },

            displayedRows() {
                if (! this.usesLocalData) {
                    return this.sortedRows;
                }

                return this.sortedRows.filter(row => row.passesFilter(this.filter));
            },

            sortedRows() {
                if (! this.usesLocalData) {
                    return this.rows;
                }

                if (this.sort.fieldName === '') {
                    return this.rows;
                }

                if (this.columns.length === 0) {
                    return this.rows;
                }

                const sortColumn = this.getColumn(this.sort.fieldName);

                if (! sortColumn) {
                    return this.rows;
                }

                return this.rows.sort(sortColumn.getSortPredicate(this.sort.order, this.columns));
            },

            storageKey() {
                return `vue-table-component.${window.location.host}${window.location.pathname}${this.cacheId}`;
            },
        },

        methods: {
            async pageChange(page) {
                this.pagination.currentPage = page;

                await this.mapDataToRows();
            },



            async mapDataToRows() {
                const data = this.usesLocalData
                    ? this.prepareLocalData()
                    : await this.fetchServerData();

                let rowId = 0;

                this.rows = data
                    .map(rowData => {
                        rowData.vueTableComponentInternalRowId = rowId++;
                        return rowData;
                    })
                    .map(rowData => new Row(rowData, this.columns));
            },

            prepareLocalData() {
                this.pagination = null;

                return this.data;
            },

            async fetchServerData() {
                const page = this.pagination && this.pagination.currentPage || 1;

                const response = await this.data({
                    filter: this.filter,
                    sort: this.sort,
                    page: page,
                });


                this.pagination = response.pagination;

                return response.data;
            },

            changeSorting(column) {
                if (this.sort.fieldName !== column.properties.show) {
                    this.sort.fieldName = column.properties.show;
                    this.sort.order = 'asc';
                } else {
                    this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc');
                }

                if (! this.usesLocalData) {
                    this.mapDataToRows();
                }

                this.saveState();
            },

            getColumn(columnName) {
                return this.columns.find(column => column.properties.show === columnName);
            },

            saveState() {
                expiringStorage.set(this.storageKey, pick(this.$data, ['filter', 'sort']), this.cacheLifetime);
            },

            restoreState() {
                const previousState = expiringStorage.get(this.storageKey);

                if (previousState === null) {
                    return;
                }

                this.sort = previousState.sort;
                this.filter = previousState.filter;

                this.saveState();
            },
        },
    };
</script>
