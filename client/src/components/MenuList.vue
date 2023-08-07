<template>
<v-navigation-drawer app class="mt-5" :width="250">
    <div class="username grey lighten-3">
        <v-icon class="indigo--text display-2">mdi-account</v-icon>
        <p class="pt-3 title">{{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <v-list class="list">
        <v-list-item class="list-item">
            <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="ml-3">My Profile</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <div color="primary" dark v-bind="attrs" v-on="on">
                        <v-list-item class="list-item mt-3">
                            <v-list-item-icon>
                                <v-icon>mdi-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="ml-3">Add New Book</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="title ml-4 mt-3">Add New Book</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field label="Title" v-model="title"></v-text-field>
                            <v-text-field label="Author" v-model="author"></v-text-field>
                            <v-text-field label="Description" v-model="description"></v-text-field>
                            <v-text-field label="Image Link" v-model="imageLink"></v-text-field>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn class="mb-4"" color=" indigo white--text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn class="ml-3 mr-4 mb-4" color="indigo white--text" @click=" addBook">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-list-item class="list-item" @click="signOut">
            <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="ml-3">Sign Out</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import api from "../helpers/api";

export default {
    props: {
        user: {},
    },
    data() {
        return {
            title: "",
            author: "",
            description: "",
            imageLink: "",
            error: "",
            dialog: false,
        };
    },
    methods: {
        signOut() {
            this.$cookies.remove('token')
            this.$router.push("/login");
        },
        async addBook() {
            try {
                const response = await api.post("/book", {
                    title: this.title,
                    author: this.author,
                    description: this.description,
                    imageLink: this.imageLink,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                console.log(response, 'resssss');
                this.dialog = false
                this.$emit("bookAdded");
            } catch (error) {
                this.error = error.response.data;
                console.log(error, 'errror');
            }
        }
    },
}
</script>

<style>
.username {
    padding: 6px;
    display: flex;
    padding-left: 20px;
    gap: 20px;
}

.list {
    display: flex;
    flex-direction: column;
}

.list-item {
    padding: 15px;
    display: flex;
    padding-left: 40px;
}

.list-item:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
</style>
