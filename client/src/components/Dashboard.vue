<template>
<div>
    <navbar :user="user"></navbar>
    <v-app>
        <menuList @bookAdded="getBooks" :user="user"></menuList>
        <v-content class="content">
            <div class="search-section">
                <v-text-field v-model="searchText" label="Search Book" class="search-btn" @input="handleSearch"></v-text-field>
                <addBook class="add-book-btn"></addBook>
            </div>
            <div class="cards-container">
                <div class="cards" v-for="book in books" :key="book.title">
                    <bookCard @bookDeleted="getBooks" @bookEdited="getBooks" class="card mb-4" :book="book"></bookCard>
                </div>
            </div>
        </v-content>
    </v-app>
</div>
</template>

<script>
import Nav from './Nav'
import BookCard from './BookCard'
import MenuList from './MenuList'
import api from "../helpers/api";
import AddBook from "./AddBook"

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
        "menuList": MenuList,
        "addBook": AddBook
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
                const response = await api.get(`/book/${this.user.id}`, {
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
        async loadData() {
            await this.getUserData();
            await this.getBooks();
        },
    },
    mounted() {
        this.protectRoute();
        this.loadData();

    }
}
</script>

<style>
.search-btn {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin: -20px 0px 50px 80px;
}

.card {
    width: 400px;
    transition: all 0.3s linear;
}

.card:hover {
    transform: translate3D(0, -9px, 0);
}

.content {
    padding-top: 48px !important;
    margin-left: 16.5%;
    width: 84%;
}

.add-book-btn {
    visibility: hidden;
}

@media (max-width: 900px) {
    .content {
        margin-left: 30%;
    }

    .cards-container {
        margin-top: 5px
    }

    .card {
        width: 300px;

    }

    .search-btn {
        width: 300px;
        margin-left: 15%
    }
}

@media (max-width: 650px) {
    .content {
        margin-left: 5px
    }

    .search-btn {
        width: 90%;
    }

    .add-book-btn {
        visibility: visible;
    }

    .search-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 60px
    }

    .card {
        width: 90%;

    }

    .cards-container {
        margin-left: 25%
    }
}
</style>
