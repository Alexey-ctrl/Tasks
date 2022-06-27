<template>
  <form @submit.prevent="registrationUser">
    <div class="fs-15">Registration</div>
    <div class="mt-05">
      <div><label for="username">Username</label></div>
      <input class="text-input" id="username" type="text" v-model="username">
    </div>
    <div class="mt-05">
      <div><label for="password">Password</label></div>
      <input class="text-input"  id="password" type="password" v-model="password" autocomplete="on">
    </div>
    <div class="mt-05">
      <div><label for="confirm-password">Confirm Password</label></div>
      <input class="text-input"  id="confirm-password" type="password" v-model="confirmPassword" autocomplete="on">
    </div>
    <button class="mt-05 btn btn-fill-blue" type="submit">Sign up</button>
    <div class="mt-05">
      <router-link to="/login">Sing in</router-link>
      <span> | </span>
      <router-link to="/">Back</router-link>
    </div>
    <error-list :errors="errors"></error-list>
  </form>
</template>

<script>
import errorList from "@/components/errorList";
import {registerUser} from "@/api";

export default {
  name: "RegistrationPage",
  components: {errorList},
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errors: []
    }
  },
  methods: {
    async registrationUser() {
      this.errors = [];
      if (!this.username)
        return this.errors.push('Username is empty');
      if (!this.password)
        return this.errors.push('Password is empty');
      if (this.password !== this.confirmPassword)
        return this.errors.push('Password is not confirmed');
      const user = await registerUser({
        username: this.username,
        password: this.password
      });
      if (user.error)
        return this.errors.push(user.error);
      this.$emit('login', user)
    }
  }
}
</script>

<style scoped>

</style>