<template>
<div class="sidebar grey lighten-2 black--text" :width="250">
    <div class="username">
        <p class="pt-3 title">Welcome {{ user.firstName }} {{ user.lastName }}</p>
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
                            <div v-if="!$v.title.required && $v.title.$dirty" class="red--text text--accent-4">The title field is required.</div>
                            <v-text-field label="Author" v-model="author"></v-text-field>
                            <div v-if="!$v.author.required && $v.author.$dirty" class="red--text text--accent-4">The author field is required.</div>
                            <v-text-field label="Description" v-model="description"></v-text-field>
                            <div v-if="!$v.description.required && $v.description.$dirty" class="red--text text--accent-4">The description field is required.</div>
                            <v-text-field label="Image Link" v-model="imageLink"></v-text-field>
                            <div v-if="!$v.imageLink.required && $v.imageLink.$dirty" class="red--text text--accent-4">The image link field is required.</div>

                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn class="mb-4"" color=" grey darken-1 white--text" @click="resetForm">
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
import {
    required,
} from 'vuelidate/lib/validators'

export default {
    props: {
        user: {},
        books: []
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
    validations: {
        title: {
            required,
        },
        author: {
            required,
        },
        description: {
            required,
        },
        imageLink: {
            required,
        },
    },
    methods: {
        signOut() {
            this.$cookies.remove('token')
            this.$router.push("/login");
        },
        async addBook() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
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
                const newBook = response.data.data
                this.dialog = false
                this.books.unshift(newBook);
            } catch (error) {
                this.error = error.response.data;
            }
        },
        resetForm() {
            this.dialog = false
            this.$v.$reset();
            this.title = "";
            this.author = "";
            this.description = "";
            this.imageLink = "";
            this.error = "";
        },
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
    .sidebar {
        visibility: hidden;
    }
}
</style>
