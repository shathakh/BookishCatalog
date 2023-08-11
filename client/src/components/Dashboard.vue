<template>
<div>
    <navbar :user="user"></navbar>
    <v-app>
        <Sidebar :books="books" :user="user"></Sidebar>
        <v-content class="content">
            <div class="search-section">
                <v-text-field v-model="searchText" label="Search Book" class="search-btn" @input="handleSearch"></v-text-field>
                <AddBook :books="books" class="add-book-btn"></AddBook> <!-- visible in mobile size -->
            </div>
            <div class="red--text text--accent-4 mb-5 title">{{error}}</div>
            <div class="cards-container">
                <div v-if="books.length > 0" class="cards" v-for="book in books" :key="book.title">
                    <BookCard class="card mb-4" :book="book" :books="books"></BookCard>
                </div>
                <div class="no-books-message mt-5" v-if="books.length == 0">
                    <div class="display-1 grey--text text--darken-1">There are no books!</div>
                </div>
            </div>
        </v-content>
    </v-app>
</div>
</template>

<script>
import Navbar from './Navbar'
import BookCard from './BookCard'
import Sidebar from './Sidebar'
import api from "../helpers/api";
import AddBook from "./AddBookBtnMobile"

import {
    debounce
} from 'lodash';

export default {
    data() {
        return {
            searchText: "",
            books: [],
            user: {},
            error: ""
        };
    },
    components: {
        Navbar,
        BookCard,
        Sidebar,
        AddBook
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
                this.books = response.data.data.rows;
            } catch (error) {
                this.error = error.response.data.message;
                console.log(this.error, 'this.error')
            }
        },
        async getBooks() {
            try {
                const response = await api.get(`/book/${this.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                this.books = response.data.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async getUserData() {
            try {
                const response = await api.get("/auth/user", {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('token')}`
                    }
                });
                this.user = response.data.data;
            } catch (error) {
                this.error = error.response.data.message;
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

.no-books-message {
    width: 100%
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
