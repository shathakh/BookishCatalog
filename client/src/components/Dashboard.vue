<template>
<div>
    <navbar :user="user"></navbar>
    <v-app>
        <menuList @bookAdded="getBooks" :user="user"></menuList>
        <v-content>
            <v-text-field v-model="searchText" label="Search Book" class="search-btn" @input="handleSearch"></v-text-field>
            <v-row>
        <v-col v-for="(book, index) in books" :key="book.title" :sm="4">
          <bookCard @bookDeleted="getBooks" @bookEdited="getBooks" class="card" :book="book"></bookCard>
        </v-col>
      </v-row>
        </v-content>
    </v-app>
</div>
</template>

<script>
import Nav from './Nav'
import BookCard from './BookCard3'
import MenuList from './MenuList'
import api from "../helpers/api";
import {
    debounce
} from 'lodash';

export default {
    data() {
        return {
            searchText: "",
            books: [],
            user: {}
        };
    },
    components: {
        "navbar": Nav,
        "bookCard": BookCard,
        "menuList": MenuList
    },
    methods: {
        async searchBook() {
            try {
                const response = await api.get("/book", {
                    params: {
                        searchText: this.searchText
                    },
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                console.log(response.data.data.rows, 'search');
                this.books = response.data.data.rows;
            } catch (error) {
                this.error = error.response.data;
                console.log(error.response.data);
            }
        },
        async getBooks() {
            try {
                const response = await api.get("/book/17", {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                console.log(response.data.data, 'reeeeeespone');
                this.books = response.data.data;
            } catch (error) {
                this.error = error.response.data;
                console.log(error.response.data, 'errorrr');
            }
        },
        async getUserData() {
            try {
                const response = await api.get("/auth/user", {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                console.log(response.data.data, 'userrr');
                this.user = response.data.data;
            } catch (error) {
                this.error = error.response.data;
                console.log(error.response.data, 'errorrr');
            }
        },
        async protectRoute() {
            if (!this.$cookies.get('token')) {
                this.$router.push("/login");

            }
        },
        handleSearch: debounce(function () {
            this.searchBook();
        }, 250),
    },
    mounted() {
        this.protectRoute();

        this.getBooks();
        this.getUserData();
    }
}
</script>

<style>


.search-btn {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px
}
</style>
