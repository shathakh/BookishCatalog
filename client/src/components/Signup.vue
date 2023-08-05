<template>
<div class="container">
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <v-text-field label="firstName" hide-details="auto" v-model="firstName" type="text"></v-text-field>
            <div v-if="!$v.firstName.required && $v.firstName.$dirty" class="invalid-feedback">The first name field is required.</div>
        </div>
        <div class="form-group">
            <v-text-field label="lastName" hide-details="auto" v-model="lastName" type="text"></v-text-field>
            <div v-if="!$v.lastName.required && $v.lastName.$dirty" class="invalid-feedback">The last name field is required.</div>
        </div>
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
            <p>Already have an account <router-link to="/login">Login</router-link>
            </p>
        </div>
        <v-btn dark class="cyan" type="submit">
            Sign up
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: null
        };
    },
    validations: {
        firstName: {
            required,
        },
        lastName: {
            required,
        },
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
                    const response = await api.post("/signup", {
                        firstName: this.firstName,
                        lastName: this.lastName,
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
