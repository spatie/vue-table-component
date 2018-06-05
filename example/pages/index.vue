<template>
    <TableComponent
        :data="members"
        sort-by="lastName"
        sort-order="asc"
    >
        <template slot="thead">
            <tr>
                <table-header name="firstName">First name</table-header>
                <table-header name="lastName">Last name</table-header>
                <table-header name="instrument">Instrument</table-header>
                <table-header name="songs">Songs</table-header>
            </tr>
        </template>
        <template slot="tbody" slot-scope="{ row }">
            <tr>
                <td>{{ row.firstName }}</td>
                <td>{{ row.lastName }}</td>
                <td>{{ row.instrument }}</td>
                <td>{{ row.songs }}</td>
            </tr>
        </template>
    </TableComponent>
</template>

<script>
import { TableComponent, TableHeader } from 'vue-table-component';

export default {
    components: {
        TableComponent,
        TableHeader,
    },

    data: () => ({
        members: [
            {
                firstName: 'John',
                lastName: 'Lennon',
                instrument: 'Guitar',
                birthday: '04/10/1940',
                songs: 72,
            },
            {
                firstName: 'Paul',
                lastName: 'McCartney',
                instrument: 'Bass',
                birthday: '18/06/1942',
                songs: 70,
            },
            {
                firstName: 'George',
                lastName: 'Harrison',
                instrument: 'Guitar',
                birthday: '25/02/1943',
                songs: 22,
            },
            {
                firstName: 'Ringo',
                lastName: 'Starr',
                instrument: 'Drums',
                birthday: '07/07/1940',
                songs: 2,
            },
        ],
    }),
};
</script>
