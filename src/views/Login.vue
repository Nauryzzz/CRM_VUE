<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"app_title" | localize}}</span>
      <div class="input-field">
        <input 
          id="email" 
          type="text" 
          v-model.trim="email" 
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
            {{"empty_email" | localize}}
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
            {{"invalid_email"| localize}}
        </small>
      </div>
      <div class="input-field">
        <input 
          id="password" 
          type="password"
          v-model.trim="password" 
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{"password" | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
            {{"empty_password" | localize}}
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
            Password должен состоять как минимум из {{$v.password.$params.minLength.min}} символов! Сейчас он {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"login" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"no_account" | localize}}
        <router-link to="/register">{{"register" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from "vuelidate/lib/validators";
  import messages from "@/utils/messages";
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: ""
      }
    },
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        const formData = {
          email: this.email,
          password: this.password
        }

        try {
          await this.$store.dispatch("login", formData);
          this.$router.push("/");
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(localizeFilter(messages[this.$route.query.message]))
      }
    }
  };
</script>

<style>
</style>