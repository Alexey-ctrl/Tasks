<template>
  <div>
    <div class="fs-15">{{username}}</div>
    <div v-if="!user">
      <router-link to="/login">Sing in</router-link>
      <span> | </span>
      <router-link to="/registration">Sing up</router-link>
    </div>
    <div v-else>
      <a href="" @click.prevent="$emit('logout')">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "currentUser",
  props: ['user'],
  computed: {
    username() {
      return !this.user ? 'Guest': this.user.username
    }
  }
}
</script>