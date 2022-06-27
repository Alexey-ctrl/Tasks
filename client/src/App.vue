<template>
  <div class="d-flex h-100">
    <section class="p-1 w-20 bg-info">
      <router-view :user="user" @login="login" @logout="logout"></router-view>
    </section>
    <section class="w-80 p-1">
      <task-list :user="user" @logout="logout"></task-list>
    </section>
  </div>
</template>

<script>
import {getUserFromCookie, saveJwtToCookie} from "@/cookie";
import taskList from "@/components/Tasks/taskList";

export default {
  name: 'App',
  components: {taskList},
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = getUserFromCookie();
  },
  methods: {
    logout() {
      this.user = null;
      saveJwtToCookie('0');
    },
    login(userData) {
      saveJwtToCookie(userData.JWT);
      this.user = userData.user;
      this.$router.push('/');
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: white;
}

body, html {
  height: 100%;
}
</style>
