<template>
  <form @submit.prevent="loginUser">
    <div class="fs-15">Login</div>
    <div class="mt-05">
      <div><label for="username">Username</label></div>
      <input class="text-input" id="username" type="text" v-model="username">
    </div>
    <div class="mt-05">
      <div><label for="password">Password</label></div>
      <input class="text-input" id="password" type="password" v-model="password" autocomplete="on">
    </div>
    <button class="mt-05 btn btn-fill-blue" type="submit">Sign in</button>
    <div class="mt-05">
      <router-link to="/registration">Sing up</router-link>
      <span> | </span>
      <router-link to="/">Back</router-link>
    </div>
    <error-list :errors="errors"></error-list>
  </form>
</template>

<script>
import errorList from "@/components/errorList";
import {loginUser} from "@/api";

export default {
  name: "LoginPage",
  components: {errorList},
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  methods: {
    async loginUser() {
      this.errors = [];
      if (!this.username)
        return this.errors.push('Username in empty');
      if (!this.password)
        return this.errors.push('Password in empty');

      const userData = await loginUser({
        username: this.username,
        password: this.password
      });
      if (userData.error)
        return this.errors.push(userData.error);
      this.$emit('login', userData);
    }
  }
}
</script>