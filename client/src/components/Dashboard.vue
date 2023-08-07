<template>
<div>
    <navbar :user="user"></navbar>
    <v-app>
        <menuList @bookAdded="getBooks" :user="user"></menuList>
        <v-content>
            <v-text-field v-model="searchText" label="Search Book" class="search-btn"></v-text-field>
            <div class="books" v-for="book in books" :key="book.title">
                <bookCard @bookDeleted="getBooks" @bookEdited="getBooks" claa="card" :book="book"></bookCard>
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
                console.log(response);
                this.books = response.data;
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
        }
    },
    mounted() {
        this.protectRoute();

        this.getBooks();
        this.getUserData();
    }
}
</script>

<style>
.books {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    margin: 0 auto;
    margin-top: 80px;
}

.search-btn {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px
}
</style>
