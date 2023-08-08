<template>
<div class="sidebar grey lighten-2 black--text" :width="250">
    <div class="username">
        <v-icon class="indigo--text display-2">mdi-account</v-icon>
        <p class="pt-3 title">{{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <div class="list">
        <div class="list-item">
            <div class="list-icon">
                <v-icon class="indigo--text">mdi-book</v-icon>
            </div>
            <div class="list-content ml-4">
                My Books
            </div>
        </div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <div color="primary" dark v-bind="attrs" v-on="on">
                        <div class="list-item mt-3">
                            <div class="list-icon">
                                <v-icon class="indigo--text">mdi-plus</v-icon>
                            </div>
                            <div class="list-content ml-4">
                                Add New Book
                            </div>
                        </div>
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

        <div class="list-item" @click="signOut">
            <div class="list-icon">
                <v-icon class="indigo--text">mdi-logout</v-icon>
            </div>
            <div class="list-content ml-4">
                Sign Out
            </div>
        </div>
    </div>
</div>
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
.sidebar {
    margin-top: 49px;
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    color: white;
    z-index: 1;

}

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
    align-items: center;
}

.list-item:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
@media (max-width: 650px) {
.sidebar{
visibility: hidden;
}
}
</style>
