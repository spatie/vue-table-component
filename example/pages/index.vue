<template>
    <TableComponent
        :data="members"
        :columns="[
            { name: 'firstName', label: 'First name' },
            { name: 'lastName', label: 'Last name' },
            { name: 'instrument', label: 'Instrument' },
            { name: 'songs', label: 'Songs' },
        ]"
        sort-by="lastName"
        sort-order="asc"
    />
</template>

<script>
import TableComponent from 'vue-table-component';

export default {
    components: {
        TableComponent,
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
