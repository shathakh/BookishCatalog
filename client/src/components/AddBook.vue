<template>
<v-row justify="center">
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
</template>

<script>
export default {
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
}
</script>
