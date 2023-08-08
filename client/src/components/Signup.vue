<template>
<div class="container">
    <div class="welcome">
        <h3 class="display-1 indigo--text ">Happy to Join Book Catalog</h3>
        <v-img width="550" class="mr-5 mb-5" src="https://i.ibb.co/HdpnbsQ/Instruction-manual-rafiki-1.png"></v-img>
    </div>
    <form @submit.prevent="submitForm" class="pt-5">
        <div class="form-group mb-4">
            <v-text-field label="First Name" hide-details="auto" v-model="firstName" type="text"></v-text-field>
            <div v-if="!$v.firstName.required && $v.firstName.$dirty" class="red--text text--accent-4">The first name field is required.</div>
        </div>
        <div class="form-group mb-4">
            <v-text-field label="Last Name" hide-details="auto" v-model="lastName" type="text"></v-text-field>
            <div v-if="!$v.lastName.required && $v.lastName.$dirty" class="red--text text--accent-4">The last name field is required.</div>
        </div>
        <div class="form-group mb-4">
            <v-text-field label="Email" hide-details="auto" v-model="email"></v-text-field>
            <div v-if="!$v.email.required && $v.email.$dirty" class="red--text text--accent-4">The email field is required.</div>
            <div v-if="!$v.email.email && $v.email.$dirty" class="red--text text--accent-4">The email is not valid.</div>
        </div>
        <div class="form-group mb-4">
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <div v-if="!$v.password.required && $v.password.$dirty" class="red--text text--accent-4">The password field is required.</div>
            <div v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty" class="red--text text--accent-4">You must have at least {{ $v.password.$params.minLength.min }} letters.</div>
        </div>
        <div class="pt-3">
            <p>Already have a user <router-link to="/login">Login</router-link>
            </p>
        </div>
        <v-btn class="indigo white--text" type="submit">
            Sign up
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: ""
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
                    const response = await api.post("/auth/signup", {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password
                    });
                    console.log(response);
                    this.$cookies.set('token', response.data.data.token);

                    this.$router.push("/dashboard");
                } catch (error) {
                    this.error = error.response.data.message;
                }
            }
        }

    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    gap: 50px
}

form {
    margin-top: 120px;
    width: 50%
}
.welcome {
    display: flex;
    flex-direction: column;
    margin-top: 80px
}

.welcome h3 {
    margin-bottom: -20px
}

</style>
