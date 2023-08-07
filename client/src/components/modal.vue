<template>
<v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Open Dialog
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="title ml-4 mt-3">Add New Book</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="Title"></v-text-field>
                    <v-text-field label="Author"></v-text-field>
                    <v-text-field label="Description"></v-text-field>
                    <v-text-field label="Image Link"></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mb-4"" color="indigo white--text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn class="ml-3 mr-4 mb-4" color="indigo white--text" @click="dialog = false">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
}
</script>
