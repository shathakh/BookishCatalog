<template>
<v-toolbar dense app class=" nav indigo white--text">
    <v-toolbar-title>Bookish Catalog</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-icon class="white--text mr-1">mdi-account</v-icon>
    <p class=" pt-3 ">{{user.firstName}} {{user.lastName}}</p>
    <v-btn color="primary" @click="signOut">
        Sign Out
    </v-btn>
</v-toolbar>
</template>

<script>
export default {
    props: {
        user: {},
    },
    methods: {
        signOut() {
            this.$cookies.remove('token')
            this.$router.push("/login");
        },
        }
}
</script>

<style>
</style>
