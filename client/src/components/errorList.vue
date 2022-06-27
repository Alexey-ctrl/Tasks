<template>
  <div class="mt-1">
    <div class="error" v-for="(error, index) of errors" :key="index">
      - {{error}}
    </div>
  </div>
</template>

<script>
export default {
  name: "errorList",
  props: ['errors']
}
</script>

<style scoped>
  .error {
    color: #dc3545;
  }
</style>