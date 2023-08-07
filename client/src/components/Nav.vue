<template>
<v-toolbar dense app class="indigo white--text">
    <v-toolbar-title>Book Catalog</v-toolbar-title>

    <v-spacer></v-spacer>
            <v-icon class="white--text display-2">mdi-account</v-icon>

    <p class="title pt-3 pr-3">{{user.firstName}} {{user.lastName}}</p>

</v-toolbar>
</template>

<script>
export default {
    props: {
        user: {},
    },
}
</script>
