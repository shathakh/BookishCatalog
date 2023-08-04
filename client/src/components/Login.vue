<template>
<div class="container">
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <v-text-field label="Email" hide-details="auto" v-model="email" type="email"></v-text-field>
            <div v-if="!$v.email.required && $v.email.$dirty" class="invalid-feedback">The email field is required.</div>
            <div v-if="!$v.email.email && $v.email.$dirty" class="invalid-feedback">The email is not valid.</div>
        </div>
        <div class="form-group">
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <div v-if="!$v.password.required && $v.password.$dirty" class="invalid-feedback">The password field is required.</div>
            <div v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min }} letters.</div>
        </div>
        <div>
        <p>Don't have an account <router-link to="/signup"> Sign up</router-link></p>
        </div>
        <v-btn dark class="cyan" type="submit">
            Register
        </v-btn>
        <div class="danger-alert" v-html="error" />
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
            error: null
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
                    const response = await api.post("/login", {
                        email: this.email,
                        password: this.password
                    });
                    console.log(response);
                    this.$router.push("/dashboard");
                } catch (error) {
                    this.error = error.response.data;
                    console.log(error.response.data);
                }
            }
        }

    }
};
</script>

<style scoped>
.container {
    width: 50%;
}
</style>
