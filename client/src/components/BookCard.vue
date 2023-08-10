<template>
<v-card class="" max-width="344">
    <v-img :src="book.imageLink" height="300px"></v-img>
    <div class="mt-1 d-flex justify-center">
        <v-card-title class="title">
            {{book.title}} </v-card-title>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <div class="ml-5" color="primary" dark v-bind="attrs" v-on="on">
                        <v-icon class="edit-icon indigo--text mt-3 ml-5">mdi-pencil</v-icon>
                    </div>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="title ml-4 mt-3">Edit Book</span>
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

                        <v-btn class="mb-4"" color=" grey darken-1 white--text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn class="ml-3 mr-4 mb-4" color="indigo white--text" @click="editBook(book.id)">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <DeleteBookModal :bookId="book.id" :books="books" :dialogDelete="dialogDelete"></DeleteBookModal>

    </div>
    <v-card-actions>
        <div class="ml-2"><span class="indigo--text">Author:</span> {{book.author}}</div>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
            <v-icon class="indigo--text">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
    </v-card-actions>

    <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                {{book.description}}
            </v-card-text>
        </div>
    </v-expand-transition>
</v-card>
</template>

<script>
import api from "../helpers/api";
import DeleteBookModal from "./ConfirmDeleteModal"

export default {
    props: {
        book: {},
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
            dialogDelete: false,
            show: false,

        };
    },
    components: {
        DeleteBookModal
    },
    created() {
        this.title = this.book.title;
        this.author = this.book.author;
        this.description = this.book.description;
        this.imageLink = this.book.imageLink;
    },
    methods: {
        async deleteBook(bookId) {
            try {
                const response = await api.delete(`/book/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                const bookIndex = this.books.findIndex(book => book.id === bookId);
                if (bookIndex !== -1) {
                    this.books.splice(bookIndex, 1); // Remove 1 element at the bookIndex
                }
                this.dialogDelete = false
            } catch (error) {
                this.error = error.response.data;
            }
        },
        async editBook(bookId) {
            try {
                const response = await api.put(`/book/${bookId}`, {
                    title: this.title,
                    author: this.author,
                    description: this.description,
                    imageLink: this.imageLink
                }, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                const bookIndex = this.books.findIndex(book => book.id === bookId);
                if (bookIndex !== -1) {
                    this.books[bookIndex].title = this.title;
                    this.books[bookIndex].author = this.author;
                    this.books[bookIndex].description = this.description;
                    this.books[bookIndex].imageLink = this.imageLink;
                    console.log(this.books, 'books after edit')
                } else {
                    console.log("Book not found");
                }
                this.dialog = false
            } catch (error) {
                this.error = error.response.data;
            }
        }
    }
}
</script>

<style>
.edit-icon:hover {
    color: green !important;
    cursor: pointer;
}

.delete-icon:hover {
    color: red !important;
    cursor: pointer;
}
</style>
