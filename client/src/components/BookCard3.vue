<template>
<v-card class="" max-width="344">
    <v-img :src="book.imageLink" height="200px"></v-img>
    <div class="mt-1 d-flex justify-center">
        <v-card-title class="title">
            {{book.title}} </v-card-title>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="ml-5" color="primary" dark v-bind="attrs" v-on="on">
                            <v-icon class="green--text mt-3 ml-5" style="cursor: pointer;">mdi-pencil</v-icon>
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

                            <v-btn class="mb-4"" color=" indigo white--text" @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn class="ml-3 mr-4 mb-4" color="indigo white--text" @click="editBook(book.id)">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <template>
                <v-row justify="center">
                    <v-icon class="red--text mt-3" style="cursor: pointer;" @click.stop="dialogDelete = true">mdi-delete</v-icon>
                    <v-dialog v-model="dialogDelete" max-width="290">
                        <v-card>
                            <v-card-title class="title ml-5 red--text lighten-1">
                                Are You Sure?
                            </v-card-title>

                            <v-card-text>
                                Do you really want to delete this book.
                                This book can not be restore.
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn color="grey lighten-1 mb-2" text @click="dialogDelete = false">
                                    Cancel
                                </v-btn>

                                <v-btn color="red lighten-1 mb-2 mr-5" text @click="deleteBook(book.id)">
                                    Delete
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>

    </div>
    <v-card-actions>
        <div class="ml-2">Author: {{book.author}}</div>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
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

export default {
    props: {
        book: {},
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
                console.log(response, 'deleteee');
                this.$emit("bookDeleted");
                this.dialogDelete = false
            } catch (error) {
                console.log('errrror', error)
                this.error = error.response.data;
                console.log(error.response.data);
            }
        },
        async editBook(bookId) {
            console.log(bookId, 'bok id')
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
                console.log(response, 'res editt');
                this.$emit("bookEdited");
                this.dialog = false
            } catch (error) {
                this.error = error.response.data;
                console.log(error.response.data);
            }
        }
    }
}
</script>