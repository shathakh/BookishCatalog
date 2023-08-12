<template>
<div class="navbar px-3 indigo white--text">
    <h2>Bookish Catalog</h2>
    <div class="nav-right">
        <v-icon class="white--text mr-1">mdi-account</v-icon>
        <p class=" pt-3 ">{{user.firstName}} {{user.lastName}}</p>
        <v-btn color="blue darken-4 white--text" @click="signOut" class="ml-3">
            Sign Out
        </v-btn>
    </div>
</div>
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
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1;
}

.nav-right {
    display: flex;
}
</style>
