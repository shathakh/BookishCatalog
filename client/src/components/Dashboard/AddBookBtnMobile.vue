<template>
<div justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <div color="primary" dark v-bind="attrs" v-on="on">
                <v-btn class="indigo white--text mt-5">
                    Add Book
                </v-btn>
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

                <v-btn class="mb-4"" color=" grey lighten-1 white--text" @click="resetForm">
                    Close
                </v-btn>
                <v-btn class="ml-3 mr-4 mb-4" color="indigo white--text" @click="addBook">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import api from "../../helpers/api";
import {
    required,
} from 'vuelidate/lib/validators'

export default {
    props: {
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
