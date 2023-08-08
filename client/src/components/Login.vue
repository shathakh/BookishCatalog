<template>
<div class="container">
    <div class="welcome">
        <h3 class=" display-1 indigo--text">Welcome to Bookish Catalog</h3>
        <v-img width="550" class="mr-5 mb-5" src="https://i.ibb.co/CBNt8Kv/Reading-glasses-rafiki.png"></v-img>
    </div>
    <form @submit.prevent="submitForm" class="pt-5">
        <div class="form-group mb-5">
            <v-text-field label="Email" hide-details="auto" v-model="email"></v-text-field>
            <div v-if="!$v.email.required && $v.email.$dirty" class="red--text text--accent-4">The email field is required.</div>
            <div v-if="!$v.email.email && $v.email.$dirty" class="red--text text--accent-4">The email is not valid.</div>
        </div>
        <div class="form-group mb-5">
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <div v-if="!$v.password.required && $v.password.$dirty" class="red--text text--accent-4">The password field is required.</div>
            <div v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty" class="red--text text--accent-4">You must have at least {{ $v.password.$params.minLength.min }} letters.</div>
        </div>
        <div class="pt-5">
            <p>Create a new user <router-link to="/signup"> Sign up</router-link>
            </p>
        </div>
        <v-btn class="indigo white--text" type="submit">
            Login
        </v-btn>
        <div class="red--text text--accent-4 mt-4 title">{{error}}</div>
    </form>
</div>
</template>

<script>
import api from "../helpers/api";
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(18)
        }
    },
    methods: {
        async submitForm() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            if (!this.$v.$error) {
                try {
                    const response = await api.post("/auth/login", {
                        email: this.email,
                        password: this.password
                    });
                    console.log(response.data.data.token);
                    this.$cookies.set('token', response.data.data.token);
                    this.$router.push("/dashboard");

                } catch (error) {
                    this.error = error.response.data;
                    console.log(error.response.data);
                }
            }
        },
        async protectRoute() {
            if (this.$cookies.get('token')) {
                this.$router.push("/dashboard");

            }
        }
    },
    mounted() {
        this.protectRoute();
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    gap: 40px
}

form {
    margin-top: 150px;
    width: 50%
}
.welcome {
    display: flex;
    flex-direction: column;
    margin-top: 80px
}

.welcome h3 {
    margin-bottom: -35px
}

@media (max-width: 900px) {
    .container {
        display: flex;
        flex-direction: column;
        gap: 0px
    }

    form {
        margin-top: -50px;
        width: 80%;
        margin-left: 50px
    }

    .login-image {
        width: 100%;
        padding-right: 20px
    }
}
</style>
