<template>
<div justify="center">
    <v-icon class="delete-icon indigo--text mt-3 mr-2 ml-2" @click.stop="dialogDelete = true">mdi-delete</v-icon>
    <v-dialog v-model="dialogDelete" max-width="350">
        <v-card>
            <v-card-title class="title ml-3 red--text lighten-1">
                Are You Sure?
            </v-card-title>

            <v-card-text>
                Do you really want to delete this book.
                This book can not be restore.
            </v-card-text>
            <div class="red--text text--accent-4 title">{{error}}</div>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="grey darken-1 white--text mb-2" text @click="dialogDelete = false">
                    Cancel
                </v-btn>

                <v-btn color="red lighten-1 white--text mb-2" text @click="deleteBook">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import api from "../../helpers/api";

export default {
    data() {
        return {
            dialogDelete: false,
        };
    },
    props: {
        bookId: Number,
        books: [],
        error: ""
    },
    methods: {
        async deleteBook() {
            try {
                const response = await api.delete(`/book/${this.bookId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                const bookIndex = this.books.findIndex(book => book.id === this.bookId);
                if (bookIndex !== -1) {
                    this.books.splice(bookIndex, 1); // Remove 1 element at the bookIndex
                }
                this.dialogDelete = false
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
    }
};
</script>
